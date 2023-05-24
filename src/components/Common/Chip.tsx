import THEME from '@/styles/theme';
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
      <Text
        style={{
          fontSize: 16,
          fontWeight: '400',
          color: THEME.GREY02,
          lineHeight: 22,
        }}>
        {label}
      </Text>
      {rightIcon && <View style={{marginLeft: 8}}>{rightIcon}</View>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: THEME.GREY04,
  },
});

export default Chip;
