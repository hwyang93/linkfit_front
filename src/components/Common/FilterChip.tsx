import THEME from '@/styles/theme';
import {iconPath} from '@/utils/iconPath';
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

// TODO: 안드로이드에서 텍스트가 약간 아래로 내려가있는 현상 수정
// TODO: 텍스트 아래가 잘리는 현상 수정
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
          style={[
            styles.container,
            active ? styles.active : styles.default,
            style,
          ]}
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
            <View style={{marginLeft: 8}}>
              <Image
                style={{width: 10, height: 6}}
                source={iconPath.MORE_ARROW_DOWN}
              />
            </View>
          )}
        </Pressable>
      )}
      {variant === 'reset' && (
        <Pressable
          style={[styles.container, styles.shadow, style]}
          onPress={onPress}
          {...props}>
          <Text style={styles.resetText}>{label}</Text>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 28,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  default: {
    backgroundColor: THEME.WHITE,
    borderColor: THEME.GREY04,
    borderWidth: 1,
  },
  active: {
    backgroundColor: THEME.PRIMARY04,
    borderWidth: 1,
    borderColor: THEME.PRIMARY04,
  },
  reset: {
    backgroundColor: THEME.WHITE,
  },
  defaultText: {
    color: THEME.GREY02,
  },
  activeText: {
    color: THEME.GREY01,
  },
  resetText: {
    color: THEME.PRIMARY,
    fontSize: 16,
    fontWeight: '400',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});

export default FilterChip;
