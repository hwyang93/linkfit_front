import THEME from '@/styles/theme';
import {iconPath} from '@/utils/iconPath';
import React from 'react';
import {
  Image,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

interface FilterChipProps extends PressableProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  rightIcon?: boolean;
  onPress?: () => void;
}

// TODO: 안드로이드에서 텍스트가 약간 아래로 내려가있는 현상 수정
const FilterChip: React.FC<FilterChipProps> = ({
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
        }}>
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
    backgroundColor: THEME.WHITE,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: THEME.GREY04,
  },
});

export default FilterChip;
