import {Image, Platform, Pressable, StyleSheet} from 'react-native';
import {WHITE} from '@styles/colors';
import {iconPath} from '@util/iconPath';
import common from '@styles/common';

const LocationButton = () => {
  return (
    <Pressable style={styles.locationButton}>
      <Image style={common.size24} source={iconPath.LOCATION} />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  locationButton: {
    position: 'absolute',
    bottom: 72,
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
