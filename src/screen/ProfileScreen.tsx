import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';

import ProfileBox from '@components/ProfileBox';
import {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {WHITE} from '@styles/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';

// todo: 제안하기 버튼
// todo: 강사 소개, 강사 후기 탭
// todo: 유저 정보 나오는 영역은 고정, 아래 소개와 후기는 스크롤 되게 제작

function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [showTab, setShowTab] = useState();
  const windowWidth = Dimensions.get('window').width;
  const imageSize = (windowWidth - 32) / 3;

  type imageProps = {
    item: any;
  };

  const IMAGES = [
    {src: require('@images/instructor_01.png')},
    {src: require('@images/instructor_02.png')},
    {src: require('@images/instructor_03.png')},
    {src: require('@images/instructor_04.png')},
    {src: require('@images/instructor_05.png')},
  ];

  type reviewProps = {
    item: {
      id: number;
      nickname: string;
      type: string;
      date: string;
      review: string;
    };
  };
  const REVIEW = [
    {
      id: 1,
      nickname: '저팔계',
      type: '강사',
      date: '2022.12.12',
      review: '후기 내용 입니다. 저팔계지만 유연해요. 깜짝 놀랐어요.',
    },
    {
      id: 2,
      nickname: '소다늠',
      type: '강사',
      date: '2023.1.12',
      review: '젓가락이지만 유연해요. 깜짝 놀랐어요.',
    },
  ];

  const Introduction = ({item}: imageProps) => {
    return (
      <Pressable>
        <Image
          source={item.src}
          style={{
            width: imageSize,
            height: imageSize,
          }}
        />
      </Pressable>
    );
  };

  const Review = ({item}: reviewProps) => {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[common.text_m, common.fwb, common.fs18]}>
            {item.nickname}
          </Text>
          <Text
            style={[common.text, {alignSelf: 'flex-end', marginHorizontal: 4}]}>
            {item.type}
          </Text>
          <Text style={[common.text, {alignSelf: 'flex-end'}]}>
            {item.date}
          </Text>
        </View>
        <Text style={common.text_m} numberOfLines={2}>
          {item.review}
        </Text>

        <Pressable
          style={styles.kebabIcon}
          hitSlop={10}
          onPress={() => Alert.alert('click', 'test')}>
          <Image source={iconPath.KEBAB} style={[common.KEBAB]} />
        </Pressable>
      </View>
    );
  };

  const Resume = () => {
    return (
      <View
        style={[common.mt16, common.rowCenter, {justifyContent: 'flex-end'}]}>
        <Image source={iconPath.RESUME} style={[common.RESUME]} />
        <Text style={[common.text_m]}>이력서 보기</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 강사 소개 & 후기 영역 */}
      <View style={common.mt16}>
        <FlatList
          data={REVIEW}
          renderItem={Review}
          // numColumns={}
          ItemSeparatorComponent={() => (
            <View style={[common.separator, common.mv16]} />
          )}
          ListHeaderComponent={<ProfileBox />}
          ListFooterComponent={<Resume />}
        />
      </View>
      <Pressable
        style={styles.suggestion}
        onPress={() => navigation.navigate('Suggestion')}>
        <LinearGradient
          style={[common.button, {height: 40}]}
          start={{x: 0.1, y: 0.5}}
          end={{x: 0.6, y: 1}}
          colors={['#74ebe4', '#3962f3']}>
          <Text style={[common.text_s, common.fwb, {color: WHITE}]}>
            제안하기
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  suggestion: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 104,
    height: 40,
  },

  kebabIcon: {position: 'absolute', top: 0, right: 0},
});

export default ProfileScreen;
