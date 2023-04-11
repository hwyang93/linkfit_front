import {Image, Platform, Pressable, StyleSheet} from 'react-native';
import {WHITE} from '@styles/colors';
import {iconPath} from '@util/iconPath';
import common from '@styles/common';

// todo : 프롭스로 bottom 스타일 값 받아와서 적용하기

type Props = {
  bottom?: number;
  job?: () => void;
};

const LocationButton = (props: Props) => {
  return (
    <Pressable
      style={[styles.locationButton, {bottom: props.bottom}]}
      onPress={props.job}>
      <Image style={common.size24} source={iconPath.LOCATION} />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  locationButton: {
    position: 'absolute',
    bottom: 88,
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: WHITE,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(0,0,0)',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {
          height: 1,
          width: 0,
        },
      },
      android: {elevation: 3},
    }),
  },
});
export default LocationButton;
