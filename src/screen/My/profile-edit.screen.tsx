import BoxButton from '@/components/Common/BoxButton';
import CTAButton from '@/components/Common/CTAButton';
import TextField from '@/components/Common/TextField';
import { useCheckNickname } from '@/hooks/member/use-check-nickname';
import { useMemberInfo } from '@/hooks/member/use-member-info';
import { useUpdateProfile } from '@/hooks/member/use-update-profile';
import useInput from '@/hooks/use-input';
import MESSAGE from '@/utils/constants/message';
import { ROUTE } from '@/utils/constants/route';
import { iconPath } from '@/utils/iconPath';
import DismissKeyboardView from '@components/DismissKeyboardView';
import toast from '@hooks/toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Asset, MediaType, launchImageLibrary } from 'react-native-image-picker';
import { LoggedInParamList } from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.PROFILE_EDIT>;

export const ProfileEditScreen = ({ navigation }: Props) => {
  const nicknameInput = useInput();
  const introInput = useInput();

  const [field, setField] = useState('');
  const [imageObj, setImageObj] = useState<{
    name: string | undefined;
    type: string | undefined;
    uri: string | undefined;
  }>({ name: undefined, type: undefined, uri: undefined });
  const [imageUri, setImageUri] = useState<{ uri?: string }>();

  const memberInfoQuery = useMemberInfo();
  const user = memberInfoQuery.data;

  const checkNicknameQuery = useCheckNickname(nicknameInput.value);
  const updateProfileMutation = useUpdateProfile();

  useEffect(() => {
    if (user) {
      user.nickname && nicknameInput.setValue(user.nickname);
      user.intro && introInput.setValue(user.intro);
      user.field && setField(user.field);
      user.profileImage && setImageUri({ uri: user.profileImage.originFileUrl });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onUpdateProfile = async () => {
    if (!user) {
      return;
    }

    const body = {
      nickname: nicknameInput.value,
      intro: introInput.value,
      field: field,
      imageObj: imageObj,
    };

    updateProfileMutation.mutate(body, {
      onSuccess: () => {
        toast.success({ message: '프로필이 수정되었습니다.' });
        navigation.goBack();
      },
      onError: (error) => isAxiosError(error) && toast.error({ message: error.message }),
    });
  };

  const onCheckNickname = async () => {
    const response = await checkNicknameQuery.refetch();
    if (response.data?.duplication) {
      toast.warn({ message: MESSAGE.NICKNAME_DUPLICATED });
    }

    if (response.data?.duplication === false) {
      toast.info({ message: MESSAGE.NICKNAME_AVAILABLE });
    }
  };

  const openCamera = async () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: true,
    };
    await launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
        console.log('ImagePicker Message: ', response.errorMessage);
      } else {
        let assets: Asset[] | undefined = response.assets;
        let source;
        if (assets) {
          source = {
            uri: 'data:image/jpeg;base64,' + assets[0].base64,
          };
          setImageObj({
            name: assets[0].fileName,
            type: assets[0].type,
            uri: assets[0].uri,
          });
        }
        setImageUri(source);
      }
    });
  };

  const canGoNext = nicknameInput.value && introInput.value;

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <Pressable style={styles.imageBox} onPress={openCamera}>
          <Image
            source={imageUri ? imageUri : require('../../assets/images/thumbnail.png')}
            style={styles.profileImage}
          />
          {!imageUri && <Text style={[common.text, styles.textPosition]}>편집</Text>}
        </Pressable>
        <View style={[common.mv16, common.rowCenter]}>
          <View style={[common.mr8, { flex: 3 }]}>
            <TextField
              label="닉네임"
              onChangeText={nicknameInput.onChange}
              value={nicknameInput.value}
              placeholder="김링크"
              keyboardType="default"
            />
          </View>
          <BoxButton
            label="확인"
            onPress={onCheckNickname}
            loading={checkNicknameQuery.isFetching}
            disabled={!canGoNext}
          />
        </View>
        <View style={common.mb16}>
          <TextField
            height={343}
            label="소개글"
            onChangeText={introInput.onChange}
            placeholder="소개글을 작성해주세요."
            value={introInput.value}
            keyboardType="default"
            editable
            multiline
          />
        </View>
        {user?.licences.map((licence, index) => (
          <Pressable
            key={licence + '' + index}
            onPress={() => {
              console.log(licence.field);
              setField(licence.field);
            }}>
            <View>
              <View style={[common.basicBox, common.rowCenterBetween, common.mb8]}>
                <View style={common.rowCenter}>
                  <Image source={iconPath.MY_LICENSE} style={[common.size24, common.mr8]} />
                  <Text style={common.text_m}>{licence.field}</Text>
                </View>
                {field === licence.field ? (
                  <Image source={iconPath.CHECK_BLACK} style={common.size24} />
                ) : (
                  ''
                )}
              </View>
            </View>
          </Pressable>
        ))}
        <View style={common.mt40}>
          <CTAButton
            label="완료"
            loading={updateProfileMutation.isLoading}
            disabled={!canGoNext}
            onPress={onUpdateProfile}
          />
        </View>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  imageBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 200,
  },
  textPosition: {
    position: 'absolute',
    bottom: 20,
  },
  confirm: {
    fontWeight: '700',
    color: WHITE,
  },
});
