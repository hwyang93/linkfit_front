import BoxButton from '@/components/Common/BoxButton';
import Card from '@/components/Common/Card';
import CTAButton from '@/components/Common/CTAButton';
import TextField from '@/components/Common/TextField';
import { useCheckNickname } from '@/hooks/member/use-check-nickname';
import { useMemberInfo } from '@/hooks/member/use-member-info';
import { useUpdateProfile } from '@/hooks/member/use-update-profile';
import SRC from '@/lib/constants/assets';
import MESSAGE from '@/lib/constants/message';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { imageSchema } from '@/schema/form';
import DismissKeyboardView from '@components/DismissKeyboardView';
import toast from '@hooks/toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Asset, launchImageLibrary, MediaType } from 'react-native-image-picker';
import { z } from 'zod';
import { LoggedInParamList } from '../../../AppInner';

const formSchema = z.object({
  nickname: z.string().min(2),
  intro: z.string().nonempty(),
  field: z.string().nonempty(),
  image: imageSchema,
});

type FormSchema = z.infer<typeof formSchema>;

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.PROFILE_EDIT>;

export const ProfileEditScreen = ({ navigation }: Props) => {
  const { control, handleSubmit, formState, getValues, reset, setValue } = useForm<FormSchema>({
    defaultValues: {
      nickname: '',
      intro: '',
      field: '',
      image: {
        name: '',
        type: '',
        uri: '',
      },
    },
  });

  const nicknameInputValue = getValues('nickname');
  const fieldInputValue = getValues('field');

  const [imageObj, setImageObj] = useState<{
    name: string | undefined;
    type: string | undefined;
    uri: string | undefined;
  }>({ name: undefined, type: undefined, uri: undefined });
  const [imageUri, setImageUri] = useState<{ uri?: string }>();

  const memberInfoQuery = useMemberInfo();
  const user = memberInfoQuery.data;

  const checkNicknameQuery = useCheckNickname(nicknameInputValue);
  const updateProfileMutation = useUpdateProfile();

  useEffect(() => {
    if (user) {
      reset({
        nickname: user.nickname,
        intro: user.intro,
        field: user.field,
      });

      user.profileImage && setImageUri({ uri: user.profileImage.originFileUrl });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSubmit = handleSubmit(async (data) => {
    if (!user) {
      return;
    }

    const body = {
      nickname: data.nickname,
      intro: data.intro,
      field: data.field,
      imageObj: imageObj,
    };

    updateProfileMutation.mutate(body, {
      onSuccess: () => {
        toast.success({ message: '프로필이 수정되었습니다.' });
        navigation.goBack();
      },
      onError: (error) => isAxiosError(error) && toast.error({ message: error.message }),
    });
  });

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
        const assets: Asset[] | undefined = response.assets;
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

  const isNicknameDirty = formState.dirtyFields.nickname;

  const isNicknameValid = checkNicknameQuery.data?.duplication === false;

  const canGoNext = formState.isValid && (!isNicknameDirty || (isNicknameDirty && isNicknameValid));

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
            <Controller
              name="nickname"
              control={control}
              render={({ field }) => (
                <TextField
                  label="닉네임"
                  onChangeText={field.onChange}
                  value={field.value}
                  onBlur={field.onBlur}
                  placeholder="김링크"
                  keyboardType="default"
                />
              )}
            />
          </View>
          <BoxButton
            label="확인"
            onPress={onCheckNickname}
            loading={checkNicknameQuery.isFetching}
            disabled={!isNicknameDirty}
          />
        </View>
        <View style={common.mb16}>
          <Controller
            name="intro"
            control={control}
            render={({ field }) => (
              <TextField
                height={343}
                label="소개글"
                placeholder="소개글을 작성해주세요."
                onChangeText={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                keyboardType="default"
                editable
                multiline
              />
            )}
          />
        </View>
        {user?.licences.map((licence, index) => (
          <Pressable key={licence + '' + index} onPress={() => setValue('field', licence.field)}>
            <Card style={[common.rowCenterBetween, common.mb8, { paddingVertical: 8 }]}>
              <View style={common.rowCenter}>
                <Image source={SRC.ICON.LICENSE_FILL} style={[common.size24, common.mr8]} />
                <Text style={common.text_m}>{licence.field}</Text>
              </View>
              {fieldInputValue === licence.field && (
                <Image source={iconPath.CHECK_BLACK} style={common.size24} />
              )}
            </Card>
          </Pressable>
        ))}
        <View style={common.mt40}>
          <CTAButton
            label="완료"
            loading={updateProfileMutation.isLoading}
            disabled={!canGoNext}
            onPress={onSubmit}
          />
        </View>
      </View>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  confirm: {
    color: WHITE,
    fontWeight: '700',
  },
  container: {
    backgroundColor: WHITE,
    flex: 1,
    padding: 16,
  },
  imageBox: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 16,
  },
  profileImage: {
    borderRadius: 200,
    height: 80,
    width: 80,
  },
  textPosition: {
    bottom: 20,
    position: 'absolute',
  },
});
