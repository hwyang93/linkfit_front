import { iconPath } from '@/lib/iconPath';
import { GRAY } from '@styles/colors';
import common from '@styles/common';
import { Image, StyleSheet, Text, View, ViewProps } from 'react-native';

interface EmptySetProps extends ViewProps {
  text: string;
}

const EmptySet: React.FC<EmptySetProps> = ({ text, style, ...props }) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <Image source={iconPath.EMPTY} style={styles.empty} />
      <Text style={[common.text_m, { color: GRAY.DARK }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  empty: {
    height: 56,
    marginBottom: 8,
    width: 56,
  },
});

export default EmptySet;
