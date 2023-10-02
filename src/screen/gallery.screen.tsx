import { LoggedInParamList } from '@/../AppInner';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import common from '@styles/common';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const TAB1_DATA = [
  { src: require('@images/instructor_01.png') },
  { src: require('@images/instructor_02.png') },
  { src: require('@images/instructor_03.png') },
  { src: require('@images/instructor_04.png') },
  { src: require('@images/instructor_05.png') },
];

// TODO: 헤더 텍스트를 조건에 맞춰서 수정 가능한지 알아보기

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.GALLERY>;

export const GalleryScreen = ({}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        loop={false}
        showsPagination={false}
        showsButtons={true}
        dot={false}
        nextButton={<Image source={iconPath.NEXT_BUTTON} style={common.size32} />}
        prevButton={<Image source={iconPath.PREV_BUTTON} style={common.size32} />}>
        {TAB1_DATA.map((item, index) => (
          <View key={index} style={styles.frame}>
            <Image source={item.src} resizeMode={'cover'} style={styles.photo} />
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  frame: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  photo: {
    height: 275,
    width: '100%',
  },
});
