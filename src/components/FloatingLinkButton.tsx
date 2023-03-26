import {Image, Platform, Pressable, StyleSheet, Text} from 'react-native';
import common from '@styles/common';
import {WHITE} from '@styles/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';
import LinearGradient from 'react-native-linear-gradient';

type ButtonProps = {
  title: string;
  link?: any;
  icon?: object;
  type?: string;
  right?: number;
  bottom?: number;
  job?: () => void;
};

const FloatingLinkButton = ({
  title,
  link,
  icon,
  type,
  right,
  bottom,
  job,
}: ButtonProps) => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <>
      {type === 'gradient' ? (
        <LinearGradient
          style={[styles.listButton, {bottom: bottom, right: right}]}
          start={{x: 0.1, y: 0.5}}
          end={{x: 0.6, y: 1}}
          colors={['#74ebe4', '#3962f3']}>
          <Pressable onPress={job} hitSlop={10}>
            <Text style={common.buttonText}>{title}</Text>
          </Pressable>
        </LinearGradient>
      ) : (
        <Pressable
          style={[styles.listButton]}
          onPress={() => navigation.navigate(link)}>
          <Image style={styles.listIcon} source={icon} />
          <Text style={common.text_m}>{title}</Text>
        </Pressable>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  listButton: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 32,
    right: 16,
    width: 127,
    height: 40,
    borderRadius: 20,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
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
    zIndex: 100,
  },
  listIcon: {
    marginRight: 4,
    width: 20,
    height: 20,
  },
});
export default FloatingLinkButton;
