import {
  ActivityIndicator,
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
import {useState} from 'react';
import {iconPath} from '@/utils/iconPath';
import LinearGradient from 'react-native-linear-gradient';

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {
  Asset,
  ImagePickerResponse,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';

function CenterProfileEditScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const route = useRoute<RouteProp<LoggedInParamList, 'ProfileEdit'>>();

  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [comment, setComment] = useState('');

  const [imageUri, setImageUri] = useState<{uri: string}>();
  const [imageObj, setImageObj] = useState<{
    name: string | undefined;
    type: string | undefined;
    uri: string | undefined;
  }>({name: undefined, type: undefined, uri: undefined});

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

  const canGoNext = true;
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <DismissKeyboardView>
        <Pressable style={styles.imageBox} onPress={openCamera}>
          <Image
            resizeMode={'cover'}
            source={
              imageUri
                ? imageUri
                : require('../../assets/images/center_profile_default.png')
            }
            style={styles.profileImage}
          />
        </Pressable>

        <View style={common.mv16}>
          <Input
            label={'사업자 명'}
            onChangeText={(text: string) => setCompanyName(text.trim())}
            value={companyName}
            placeholder={'링크 필라테스'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={false}
          />
        </View>

        <View style={common.mb16}>
          <Input
            label={'지역'}
            onChangeText={(text: string) => setLocation(text)}
            value={location}
            placeholder={'서울시 강남구 역삼동'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={false}
          />
        </View>

        <View style={common.mb40}>
          <Input
            label={'소개글'}
            onChangeText={(text: string) => setComment(text)}
            value={comment}
            placeholder={'소개글을 작성해주세요.'}
            keyboardType={KeyboardTypes.DEFAULT}
            editable={true}
            multiline={true}
          />
        </View>

        {/* 완료 버튼 */}
        <View style={common.mb16}>
          <Pressable disabled={!canGoNext} onPress={() => {}}>
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
      </DismissKeyboardView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: WHITE,
  },
  imageBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  profileImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
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

export default CenterProfileEditScreen;
