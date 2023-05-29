import {iconPath} from '@/utils/iconPath';
import {fetchCheckNickname, updateProfile} from '@api/member';
import DismissKeyboardView from '@components/DismissKeyboardView';
import Input, {KeyboardTypes} from '@components/Input';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Asset, MediaType, launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {LoggedInParamList} from '../../../AppInner';

const LOADING = false;

type Props = NativeStackScreenProps<LoggedInParamList, 'ProfileEdit'>;

const ProfileEditScreen = ({navigation, route}: Props) => {
  const [nickname, setNickname] = useState('');
  const [intro, setIntro] = useState('');
  const [field, setField] = useState('');
  const [licences, setLicences] = useState<any[]>([]);
  const [links, setLinks] = useState<any[]>([
    {
      seq: null,
      type: '',
      url: '',
    },
  ]);
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
    formData.append('links', links);
    if (imageObj.uri) {
      formData.append('file', imageObj);
    }

    await updateProfile(formData)
      .then(() => {
        toast.success({message: '프로필이 수정되었습니다.'});
        navigation.goBack();
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, [nickname, intro, field, links, imageObj, navigation]);

  const onCheckNickname = useCallback(async () => {
    await fetchCheckNickname(nickname)
      .then(({data}: any) => {
        if (!data.duplication) {
          Alert.alert('사용 가능한 닉네임입니다.');
        } else {
          Alert.alert('이미 사용 중인 닉네임입니다.');
        }
      })
      .catch((e: any) => {
        console.log(e);
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
            <Input
              label={'닉네임'}
              onChangeText={(text: string) => setNickname(text.trim())}
              value={nickname}
              placeholder={'김링크'}
              keyboardType={KeyboardTypes.DEFAULT}
            />
          </View>
          <Pressable style={[{flex: 1}]} onPress={onCheckNickname}>
            <LinearGradient
              style={[common.button, {height: 40}]}
              start={{x: 0.1, y: 0.5}}
              end={{x: 0.6, y: 1}}
              colors={
                canGoNext ? ['#74ebe4', '#3962f3'] : ['#dcdcdc', '#dcdcdc']
              }>
              {LOADING ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={[common.text_s, styles.confirm]}>확인</Text>
              )}
            </LinearGradient>
          </Pressable>
        </View>

        <View style={common.mb16}>
          <Input
            label={'소개글'}
            onChangeText={(text: string) => setIntro(text)}
            value={intro}
            placeholder={'소개글을 작성해주세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={true}
            multiline={true}
          />
        </View>

        {/*<Pressable*/}
        {/*  style={common.rowCenter}*/}
        {/*  onPress={() => navigation.navigate('LinkAdd')}>*/}
        {/*  <Image source={iconPath.LINK_URL} style={common.size24} />*/}
        {/*  <Text style={[common.ml8, common.text_m, {color: GRAY.DEFAULT}]}>*/}
        {/*    링크 추가하기*/}
        {/*  </Text>*/}
        {/*</Pressable>*/}
        {licences.map((licence, index) => {
          return (
            <Pressable
              key={licence + '' + index}
              onPress={() => {
                console.log(licence.field);
                setField(licence.field);
              }}>
              <View>
                <View
                  style={[
                    common.basicBox,
                    common.rowCenterBetween,
                    common.mb8,
                  ]}>
                  <View style={common.rowCenter}>
                    <Image
                      source={iconPath.MY_LICENSE}
                      style={[common.size24, common.mr8]}
                    />
                    <Text style={common.text_m}>{licence.field}</Text>
                  </View>
                  {field === licence.field ? (
                    <Image
                      source={iconPath.CHECK_BLACK}
                      style={common.size24}
                    />
                  ) : (
                    ''
                  )}
                </View>
              </View>
            </Pressable>
          );
        })}

        {/* 완료 버튼 */}
        <View style={common.mt40}>
          <Pressable disabled={!canGoNext} onPress={onUpdateProfile}>
            <LinearGradient
              style={common.button}
              start={{x: 0.1, y: 0.5}}
              end={{x: 0.6, y: 1}}
              colors={
                canGoNext ? ['#74ebe4', '#3962f3'] : ['#dcdcdc', '#dcdcdc']
              }>
              {LOADING ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={common.buttonText}>완료</Text>
              )}
            </LinearGradient>
          </Pressable>
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
