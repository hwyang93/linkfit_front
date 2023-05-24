import {WHITE} from '@/styles/colors';
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
  iconSource: ImageSourcePropType;
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
    <Pressable style={style} onPress={onPress} {...props}>
      {variant === 'primary' && (
        <LinearGradient
          style={[
            styles.iconContainer,
            label ? styles.styleWithLabel : styles.styleWithoutLabel,
          ]}
          start={{x: 0.1, y: 0.5}}
          end={{x: 0.6, y: 1}}
          colors={['#74ebe4', '#3962f3']}>
          <Image
            source={iconSource}
            style={[
              label ? common.size20 : common.size24,
              {
                marginRight: label ? 4 : 0,
              },
            ]}
          />
          {label && (
            <Text style={[styles.text, {color: THEME.WHITE}]}>{label}</Text>
          )}
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
          <Image
            source={iconSource}
            style={[
              label ? common.size20 : common.size24,
              {
                marginRight: label ? 4 : 0,
              },
            ]}
          />
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
  textPrimary: {
    color: WHITE,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  styleWithLabel: {
    height: 40,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  styleWithoutLabel: {
    width: 40,
    height: 40,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
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
});

export default FloatingActionButton;
