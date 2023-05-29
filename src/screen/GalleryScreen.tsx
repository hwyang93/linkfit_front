import {LoggedInParamList} from '@/../AppInner';
import {iconPath} from '@/utils/iconPath';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import common from '@styles/common';
import {Image, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const TAB1_DATA = [
  {src: require('@images/instructor_01.png')},
  {src: require('@images/instructor_02.png')},
  {src: require('@images/instructor_03.png')},
  {src: require('@images/instructor_04.png')},
  {src: require('@images/instructor_05.png')},
];

// TODO: 헤더 텍스트를 조건에 맞춰서 수정 가능한지 알아보기

type Props = NativeStackScreenProps<LoggedInParamList, 'Gallery'>;

const GalleryScreen = ({}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        loop={false}
        showsPagination={false}
        showsButtons={true}
        dot={false}
        nextButton={
          <Image source={iconPath.NEXT_BUTTON} style={common.size32} />
        }
        prevButton={
          <Image source={iconPath.PREV_BUTTON} style={common.size32} />
        }>
        {TAB1_DATA.map((item, index) => {
          return (
            <View key={index} style={styles.frame}>
              <Image
                source={item.src}
                resizeMode={'cover'}
                style={styles.photo}
              />
            </View>
          );
        })}
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  frame: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: 275,
  },
});

export default GalleryScreen;
