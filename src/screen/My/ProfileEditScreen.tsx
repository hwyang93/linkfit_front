import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WHITE} from '@styles/colors';
import DismissKeyboardView from '@components/DismissKeyboardView';
import common from '@styles/common';
import Input, {KeyboardTypes} from '@components/Input';
import {useCallback, useEffect, useState} from 'react';
import {iconPath} from '@util/iconPath';
import LinearGradient from 'react-native-linear-gradient';
import {fetchCheckNickname, updateProfile} from '@api/member';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {launchImageLibrary} from 'react-native-image-picker';

function ProfileEditScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const route = useRoute<RouteProp<LoggedInParamList, 'ProfileEdit'>>();
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
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    const memberInfo = route.params.memberInfo;
    setNickname(memberInfo.nickname);
    setIntro(memberInfo.intro);
    setField(memberInfo.field);
    setLicences(memberInfo.licences);
  }, [route.params.memberInfo]);

  const onUpdateProfile = useCallback(async () => {
    const data = {
      nickname: nickname,
      intro: intro,
      field: field,
      links: links,
      file: imageUri,
    };
    console.log(imageUri);
    await updateProfile(data)
      .then(() => {
        Alert.alert('프로필이 수정되었습니다.');
        navigation.goBack();
      })
      .catch((e: {message: any}) => {
        Alert.alert(e.message);
      });
  }, [nickname, intro, field, links, imageUri, navigation]);

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
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    await launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {
          uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
        };

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
              {loading ? (
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
              {loading ? (
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
}

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
