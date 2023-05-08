import {Image, StyleSheet, Text, View} from 'react-native';
import {iconPath} from '@util/iconPath';
import common from '@styles/common';
import {GRAY} from '@styles/colors';

type Props = {
  text: string;
};

function EmptySet({text}: Props) {
  return (
    <View style={styles.container}>
      <Image source={iconPath.EMPTY} style={styles.empty} />
      <Text style={[common.text_m, {color: GRAY.DARK}]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    width: 56,
    height: 56,
    marginBottom: 8,
  },
});
export default EmptySet;
