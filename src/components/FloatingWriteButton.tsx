import {Alert, Image, Platform, Pressable, StyleSheet} from 'react-native';
import common from '@styles/common';
import {WHITE} from '@styles/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';
import {iconPath} from '@util/iconPath';

type ButtonProps = {
  title?: string;
  link?: any;
  icon: object;
};

const FloatingLinkButton = ({title, link, icon}: ButtonProps) => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <Pressable
      style={styles.floatingButton}
      onPress={() => Alert.alert('click', 'test')}>
      <Image source={icon} style={common.PENCIL_B} />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
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
    borderRadius: 20,
  },
});
export default FloatingLinkButton;
