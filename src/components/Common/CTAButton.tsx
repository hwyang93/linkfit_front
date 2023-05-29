import {BLUE} from '@/styles/colors';
import common from '@/styles/common';
import THEME from '@/styles/theme';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface CTAButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'stroked';
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
}

// TODO: stroked 버튼 border 색상 LinearGradient로 변경
// TODO: 버튼 색상으로 디자인 토큰을 사용하도록 변경

const CTAButton: React.FC<CTAButtonProps> = ({
  label,
  variant = 'filled',
  disabled = false,
  loading = false,
  onPress,
  ...props
}) => {
  return (
    <>
      {variant === 'filled' && (
        <Pressable onPress={onPress} disabled={disabled || loading} {...props}>
          {({pressed}) => (
            <LinearGradient
              style={common.button}
              start={{x: 0.1, y: 0.5}}
              end={{x: 0.6, y: 1}}
              colors={
                disabled
                  ? [THEME.GREY04, THEME.GREY04]
                  : pressed
                  ? ['#062DB8', '#062DB8']
                  : ['#74ebe4', THEME.PRIMARY]
              }>
              {loading && <ActivityIndicator color="white" />}
              {!loading && <Text style={common.buttonText}>{label}</Text>}
            </LinearGradient>
          )}
        </Pressable>
      )}
      {variant === 'stroked' && (
        <Pressable onPress={onPress} disabled={disabled || loading} {...props}>
          {({pressed}) => (
            <View
              style={[
                common.button,
                {
                  backgroundColor: pressed ? '#E8EDFF' : THEME.WHITE,
                  borderWidth: 2,
                  borderColor: disabled
                    ? THEME.GREY04
                    : pressed
                    ? BLUE.DEFAULT
                    : BLUE.DEFAULT,
                },
              ]}>
              {loading && <ActivityIndicator />}
              {!loading && (
                <Text
                  style={[
                    common.buttonText,
                    {color: disabled ? THEME.GREY04 : BLUE.DEFAULT},
                  ]}>
                  {label}
                </Text>
              )}
            </View>
          )}
        </Pressable>
      )}
    </>
  );
};

export default CTAButton;
