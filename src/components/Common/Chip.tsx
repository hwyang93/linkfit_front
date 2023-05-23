import {GRAY} from '@/styles/colors';
import common from '@/styles/common';
import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

interface ChipProps extends PressableProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
}

const Chip: React.FC<ChipProps> = ({
  label,
  rightIcon,
  style,
  onPress,
  ...props
}) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress} {...props}>
      <Text style={[common.text_m, common.fcg]}>{label}</Text>
      {rightIcon && <View style={{marginLeft: 8}}>{rightIcon}</View>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: GRAY.LIGHT,
  },
});

export default Chip;
