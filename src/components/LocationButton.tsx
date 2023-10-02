import { iconPath } from '@/lib/iconPath';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { Image, Platform, Pressable, StyleSheet } from 'react-native';

// TODO : 프롭스로 bottom 스타일 값 받아와서 적용하기

interface LocationButtonProps {
  bottom?: number;
  job?: () => void;
}

const LocationButton: React.FC<LocationButtonProps> = ({ job, bottom }) => {
  return (
    <Pressable style={[styles.locationButton, { bottom: bottom }]} onPress={job}>
      <Image style={common.size24} source={iconPath.LOCATION} />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  locationButton: {
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 20,
    bottom: 88,
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    width: 40,
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
      android: { elevation: 3 },
    }),
  },
});

export default LocationButton;
