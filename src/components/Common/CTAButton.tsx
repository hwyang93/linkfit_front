import common from '@/styles/common';
import THEME from '@/styles/theme';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
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
                  : ['#62C1E9', THEME.PRIMARY]
              }>
              {loading && <ActivityIndicator color="white" />}
              {!loading && <Text style={common.buttonText}>{label}</Text>}
            </LinearGradient>
          )}
        </Pressable>
      )}
      {variant === 'stroked' && (
        <Pressable onPress={onPress} disabled={loading || disabled} {...props}>
          {({pressed}) => (
            <LinearGradient
              style={styles.gradientBorder}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}
              colors={
                disabled
                  ? [THEME.GREY04, THEME.GREY04]
                  : ['#74ebe4', THEME.PRIMARY]
              }>
              <View
                style={[
                  styles.gradientBorderInner,
                  {backgroundColor: pressed ? '#E8EDFF' : THEME.WHITE},
                ]}>
                {loading && <ActivityIndicator color={THEME.PRIMARY} />}
                {!loading && (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      textAlign: 'center',
                      color: disabled ? THEME.GREY03 : THEME.PRIMARY,
                    }}>
                    {label}
                  </Text>
                )}
              </View>
            </LinearGradient>
          )}
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  gradientBorder: {
    height: 56,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 28,
  },
  gradientBorderInner: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '99%',
    margin: 1,
    borderRadius: 28,
  },
});

export default CTAButton;
