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
import {useCallback, useState} from 'react';
import {iconPath} from '@util/iconPath';
import LinearGradient from 'react-native-linear-gradient';
import {editProfile} from '@api/member';
import {launchImageLibrary} from 'react-native-image-picker';

function ProfileEditScreen() {
  const [nickname, setNickName] = useState('');
  const [intro, setIntro] = useState('');
  const [field, setField] = useState('');
  const [links, setLinks] = useState<any[]>([
    {
      seq: null,
      type: '',
      url: '',
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState('');

  const confirm = useCallback(async () => {
    const data = {
      nickname: nickname,
      intro: intro,
      field: field,
      links: links,
    };
    await editProfile(data)
      .then(() => {
        Alert.alert('에디트 성공');
      })
      .catch((e: {message: any}) => {
        console.log(e.message);
      });
  }, [nickname, intro, field, links]);

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
        console.log(response);
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
              onChangeText={(text: string) => setNickName(text.trim())}
              value={nickname}
              placeholder={'김링크'}
              keyboardType={KeyboardTypes.DEFAULT}
            />
          </View>
          <Pressable style={[{flex: 1}]}>
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

        <View>
          <View style={[common.basicBox, common.rowCenterBetween, common.mb8]}>
            <View style={common.rowCenter}>
              <Image
                source={iconPath.MY_LICENSE}
                style={[common.size24, common.mr8]}
              />
              <Text style={common.text_m}>필라테스</Text>
            </View>
            <Image source={iconPath.CHECK_BLACK} style={common.size24} />
          </View>
        </View>

        {/* 완료 버튼 */}
        <View style={common.mt40}>
          <Pressable disabled={!canGoNext} onPress={confirm}>
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
