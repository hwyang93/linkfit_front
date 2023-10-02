import { iconPath } from '@/lib/iconPath';
import THEME from '@/styles/theme';
import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

interface FilterChipProps extends PressableProps {
  variant?: 'default' | 'reset';
  label: string;
  style?: StyleProp<ViewStyle>;
  rightIcon?: boolean;
  active?: boolean;
  onPress?: () => void;
}

// TODO: 그림자가 적용되지 않는 현상 수정
const FilterChip: React.FC<FilterChipProps> = ({
  variant = 'default',
  label,
  rightIcon,
  style,
  active,
  onPress,
  ...props
}) => {
  return (
    <>
      {variant === 'default' && (
        <Pressable
          style={[styles.container, active ? styles.active : styles.default, style]}
          onPress={onPress}
          {...props}>
          <Text
            style={[
              {
                fontSize: 16,
                fontWeight: '400',
              },
              active ? styles.activeText : styles.defaultText,
            ]}>
            {label}
          </Text>
          {rightIcon && (
            <View style={{ marginLeft: 8 }}>
              <Image style={{ width: 10, height: 6 }} source={iconPath.MORE_ARROW_DOWN} />
            </View>
          )}
        </Pressable>
      )}
      {variant === 'reset' && (
        <Pressable style={[styles.container, styles.shadow, style]} onPress={onPress} {...props}>
          <Text style={styles.resetText}>{label}</Text>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  active: {
    backgroundColor: THEME.PRIMARY04,
    borderColor: THEME.PRIMARY04,
    borderWidth: 1,
  },
  activeText: {
    color: THEME.GREY01,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 16,
    flexDirection: 'row',
    height: 28,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  default: {
    backgroundColor: THEME.WHITE,
    borderColor: THEME.GREY04,
    borderWidth: 1,
  },
  defaultText: {
    color: THEME.GREY02,
  },
  reset: {
    backgroundColor: THEME.WHITE,
  },
  resetText: {
    color: THEME.PRIMARY,
    fontSize: 16,
    fontWeight: '400',
  },
  shadow: {
    ...Platform.select({
      ios: {
        backgroundColor: THEME.WHITE,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});

export default FilterChip;
