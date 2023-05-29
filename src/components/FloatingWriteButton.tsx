import common from '@styles/common';
import {Image, Platform, Pressable, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface FloatingLinkButtonProps {
  title?: string;
  link?: any;
  icon: object;
  job?: () => void;
  bottom?: number;
}

const FloatingLinkButton: React.FC<FloatingLinkButtonProps> = ({
  icon,
  job,
  bottom,
}) => {
  return (
    <Pressable style={[styles.buttonPosition, {bottom}]} onPress={job}>
      <LinearGradient
        style={styles.floatingButton}
        start={{x: 0.1, y: 0.5}}
        end={{x: 0.6, y: 1}}
        colors={['#74ebe4', '#3962f3']}>
        <Image source={icon} style={common.size24} />
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonPosition: {
    position: 'absolute',
    bottom: 16,
    right: 16,
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
  floatingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default FloatingLinkButton;
