import BoxButton from '@/components/Common/BoxButton';
import CTAButton from '@/components/Common/CTAButton';
import TextField from '@/components/Common/TextField';
import MESSAGE from '@/utils/constants/message';
import {iconPath} from '@/utils/iconPath';
import {fetchCheckNickname, updateProfile} from '@api/member';
import DismissKeyboardView from '@components/DismissKeyboardView';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Asset, MediaType, launchImageLibrary} from 'react-native-image-picker';
import {LoggedInParamList} from '../../../AppInner';

const LOADING = false;

const LINKS = {
  seq: null,
  type: '',
  url: '',
};

type Props = NativeStackScreenProps<LoggedInParamList, 'ProfileEdit'>;

const ProfileEditScreen = ({navigation, route}: Props) => {
  const [nickname, setNickname] = useState('');
  const [intro, setIntro] = useState('');
  const [field, setField] = useState('');
  const [licences, setLicences] = useState<any[]>([]);
  const [imageUri, setImageUri] = useState<any>({});
  const [imageObj, setImageObj] = useState<{
    name: string | undefined;
    type: string | undefined;
    uri: string | undefined;
  }>({name: undefined, type: undefined, uri: undefined});

  useEffect(() => {
    const memberInfo = route.params.memberInfo;
    setNickname(memberInfo.nickname);
    setIntro(memberInfo.intro);
    setField(memberInfo.field);
    setLicences(memberInfo.licences);
    if (memberInfo.profileImage) {
      setImageUri({uri: memberInfo.profileImage.originFileUrl});
    }
  }, [route.params.memberInfo]);

  const onUpdateProfile = useCallback(async () => {
    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('intro', intro);
    formData.append('field', field);
    formData.append('links', LINKS);
    if (imageObj.uri) {
      formData.append('file', imageObj);
    }

    await updateProfile(formData)
      .then(() => {
        toast.success({message: '프로필이 수정되었습니다.'});
        navigation.goBack();
      })
      .catch(error => {
        toast.error({message: error.message});
      });
  }, [nickname, intro, field, imageObj, navigation]);

  const onCheckNickname = useCallback(async () => {
    await fetchCheckNickname(nickname)
      .then(({data}) => {
        if (!data.duplication) {
          toast.info({message: MESSAGE.NICKNAME_AVAILABLE});
        } else {
          toast.warn({message: MESSAGE.NICKNAME_DUPLICATED});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [nickname]);

  const openCamera = async () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: true,
    };
    await launchImageLibrary(options, response => {
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

  const canGoNext = nickname && intro;

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <Pressable style={styles.imageBox} onPress={openCamera}>
          <Image
            source={
              imageUri ? imageUri : require('../../assets/images/thumbnail.png')
            }
            style={styles.profileImage}
          />
          {!imageUri && (
            <Text style={[common.text, styles.textPosition]}>편집</Text>
          )}
        </Pressable>

        <View style={[common.mv16, common.rowCenter]}>
          <View style={[common.mr8, {flex: 3}]}>
            <TextField
              label="닉네임"
              onChangeText={text => setNickname(text.trim())}
              value={nickname}
              placeholder="김링크"
              keyboardType="default"
            />
          </View>
          <BoxButton
            label="확인"
            onPress={onCheckNickname}
            loading={LOADING}
            disabled={!canGoNext}
          />
        </View>
        <View style={common.mb16}>
          <TextField
            height={343}
            label="소개글"
            onChangeText={text => setIntro(text)}
            placeholder="소개글을 작성해주세요."
            value={intro}
            keyboardType="default"
            editable
            multiline
          />
        </View>
        {licences.map((licence, index) => (
          <Pressable
            key={licence + '' + index}
            onPress={() => {
              console.log(licence.field);
              setField(licence.field);
            }}>
            <View>
              <View
                style={[common.basicBox, common.rowCenterBetween, common.mb8]}>
                <View style={common.rowCenter}>
                  <Image
                    source={iconPath.MY_LICENSE}
                    style={[common.size24, common.mr8]}
                  />
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
            loading={LOADING}
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

export default ProfileEditScreen;
