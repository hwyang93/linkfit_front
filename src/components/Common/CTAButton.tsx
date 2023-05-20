import {BLUE, WHITE} from '@/styles/colors';
import common from '@/styles/common';
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
                  ? ['#dcdcdc', '#dcdcdc']
                  : pressed
                  ? ['#062DB8', '#062DB8']
                  : ['#74ebe4', '#3962f3']
              }>
              {loading && <ActivityIndicator color="white" />}
              {!loading && <Text style={common.buttonText}>{label}</Text>}
            </LinearGradient>
          )}
        </Pressable>
      )}
      {variant === 'stroked' && (
        <Pressable style={[]} onPress={onPress} disabled={disabled || loading}>
          {({pressed}) => (
            <View
              style={[
                common.button,
                {
                  backgroundColor: pressed ? '#E8EDFF' : WHITE,
                  borderWidth: 2,
                  borderColor: disabled
                    ? '#DCDCDC'
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
                    {color: disabled ? '#DCDCDC' : BLUE.DEFAULT},
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
