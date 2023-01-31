import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import common from '@styles/common';
import {useState} from 'react';
import {iconPath} from '@util/iconPath';
import {BLUE} from '@styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../AppInner';
import {RouteProp, useRoute} from '@react-navigation/native';
type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'Terms'>;

// todo: 필수항목 전체 동의, 필수 항목 체크 후 다음 버튼 동작, 보기 버튼 클릭 시 약관 확인

function SignUpFormScreen({navigation}: SignInScreenProps) {
  const route = useRoute<RouteProp<RootStackParamList, 'Terms'>>();
  console.log('Terms', route);
  const [checkItem, setCheckItem] = useState<any>([]);
  const terms = [
    {id: 1, require: true, title: '개인정보 수집 및 이용 동의', checked: false},
    {id: 2, require: true, title: '서비스 이용약관 동의', checked: false},
    {id: 3, require: true, title: '위치정보 이용약관', checked: false},
    {id: 4, require: false, title: '마케팅 수신 동의', checked: false},
  ];

  function checkHandler(id: number) {
    console.log('값', checkItem);
    let index = checkItem.findIndex((i: number) => i === id);
    console.log('index', index, 'id', id);
    let arrSelected = [...checkItem];
    if (index !== -1) {
      arrSelected.splice(index, 1);
      console.log(index);
    } else {
      arrSelected.push(id);
    }
    setCheckItem(arrSelected);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={common.text_l}>
          서비스 이용을 위해{'\n'}
          정책 및 약관을 확인해 주세요.
        </Text>
      </View>

      <View style={common.mt40}>
        <View>
          <TouchableOpacity style={[common.mr8, styles.touchWrap]}>
            <Image source={iconPath.CHECK_BOX} style={common.CHECK_BOX} />
            <Text style={[common.text_m, common.ml8]}>필수 항목 전체동의</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divideLine} />

        <View>
          {terms.map((item, index) => (
            <View key={index} style={styles.terms}>
              <TouchableOpacity
                style={styles.touchWrap}
                onPress={() => checkHandler(item?.id)}>
                {checkItem.findIndex((i: number) => i === item.id) !== -1 ? (
                  <Image
                    source={iconPath.CHECKED_BOX}
                    style={common.CHECKED_BOX}
                  />
                ) : (
                  <Image source={iconPath.CHECK_BOX} style={common.CHECK_BOX} />
                )}
                <Text
                  style={[common.text_m, common.ml8, {color: BLUE.DEFAULT}]}>
                  {item.require ? '(필수) ' : '(선택) '}
                </Text>
                <Text style={[common.text_m]}>{item.title}</Text>
              </TouchableOpacity>

              <Pressable style={styles.link}>
                <Text style={[common.text, common.mr8]}>보기</Text>
                <Image
                  source={iconPath.CIRCLE_ARROW_RIGHT}
                  style={common.CIRCLE_ARROW_RIGHT}
                />
              </Pressable>
            </View>
          ))}
        </View>
        <View style={styles.divideLine} />

        <View>
          <Text style={common.text_s}>
            선택항목은 동의하지 않으셔도 서비스를 이용할 수 있어요.
          </Text>

          <View style={common.mt40}>
            <Pressable
              onPress={() =>
                navigation.navigate('SignUpForm', {email: route.params.email})
              }>
              <LinearGradient
                style={common.button}
                start={{x: 0.1, y: 0.5}}
                end={{x: 0.6, y: 1}}
                colors={['#74ebe4', '#3962f3']}>
                <Text style={common.buttonText}>다음</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  terms: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  touchWrap: {flexDirection: 'row', alignItems: 'center'},
  link: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divideLine: {
    marginVertical: 16,
    width: '100%',
    height: 1,
    backgroundColor: BLUE.DEFAULT,
  },
});

export default SignUpFormScreen;
