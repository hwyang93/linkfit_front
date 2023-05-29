import {iconPath} from '@/utils/iconPath';
import {GRAY} from '@styles/colors';
import common from '@styles/common';
import {Image, StyleSheet, Text, View} from 'react-native';

type EmptySetProps = {
  text: string;
};

const EmptySet: React.FC<EmptySetProps> = ({text}) => {
  return (
    <View style={styles.container}>
      <Image source={iconPath.EMPTY} style={styles.empty} />
      <Text style={[common.text_m, {color: GRAY.DARK}]}>{text}</Text>
    </View>
  );
};

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
