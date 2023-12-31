import { WHITE } from '@/styles/colors';
import common from '@/styles/common';
import THEME from '@/styles/theme';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface FloatingActionButtonProps extends PressableProps {
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
  label?: string;
  iconSource?: ImageSourcePropType;
  onPress?: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  variant = 'primary',
  iconSource,
  label,
  style,
  onPress,
  ...props
}) => {
  return (
    <Pressable style={[styles.shadow, style]} onPress={onPress} {...props}>
      {variant === 'primary' && (
        <LinearGradient
          style={[styles.iconContainer, label ? styles.styleWithLabel : styles.styleWithoutLabel]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#62C1E9', '#3962f3']}>
          {iconSource && (
            <Image
              source={iconSource}
              style={[
                label ? common.size20 : common.size24,
                {
                  marginRight: label ? 4 : 0,
                },
              ]}
            />
          )}
          {label && <Text style={[styles.text, { color: THEME.WHITE }]}>{label}</Text>}
        </LinearGradient>
      )}
      {variant === 'secondary' && (
        <View
          style={[
            styles.shadow,
            styles.iconContainer,
            label ? styles.styleWithLabel : styles.styleWithoutLabel,
            styles.secondary,
          ]}>
          {iconSource && (
            <Image
              source={iconSource}
              style={[
                label ? common.size20 : common.size24,
                {
                  marginRight: label ? 4 : 0,
                },
              ]}
            />
          )}
          {label && (
            <Text
              style={[
                styles.text,
                {
                  color: THEME.BLACK,
                },
              ]}>
              {label}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: WHITE,
  },
  shadow: {
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
      android: {
        elevation: 3,
      },
    }),
  },
  styleWithLabel: {
    height: 40,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  styleWithoutLabel: {
    height: 40,
    width: 40,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  textPrimary: {
    color: WHITE,
  },
});

export default FloatingActionButton;
