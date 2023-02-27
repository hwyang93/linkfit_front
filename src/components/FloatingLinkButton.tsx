import {Image, Platform, Pressable, StyleSheet, Text} from 'react-native';
import common from '@styles/common';
import {WHITE} from '@styles/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';

type ButtonProps = {
  title: string;
  link: any;
  icon: object;
};

const FloatingLinkButton = ({title, link, icon}: ButtonProps) => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <Pressable
      style={[styles.listButton]}
      onPress={() => navigation.navigate(link)}>
      <Image style={styles.listIcon} source={icon} />
      <Text style={common.text_m}>{title}</Text>
    </Pressable>
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
  },
  listIcon: {
    marginRight: 4,
    width: 20,
    height: 20,
  },
});
export default FloatingLinkButton;
