import THEME from '@/styles/theme';
import React from 'react';
import { ActivityIndicator, Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface BoxButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'stroked';
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
}

const BoxButton: React.FC<BoxButtonProps> = ({
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
          {({ pressed }) => (
            <LinearGradient
              style={{
                alignSelf: 'flex-start',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 24,
                borderRadius: 20,
                height: 40,
              }}
              start={{ x: 0.1, y: 0.5 }}
              end={{ x: 0.6, y: 1 }}
              colors={
                disabled
                  ? [THEME.GREY04, THEME.GREY04]
                  : pressed
                  ? ['#062DB8', '#062DB8']
                  : ['#62C1E9', THEME.PRIMARY]
              }>
              {loading && (
                <ActivityIndicator
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                  }}
                  color="white"
                />
              )}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: THEME.WHITE,
                  opacity: loading ? 0 : 1,
                }}>
                {label}
              </Text>
            </LinearGradient>
          )}
        </Pressable>
      )}
      {variant === 'stroked' && (
        <Pressable onPress={onPress} disabled={loading || disabled}>
          {({ pressed }) => (
            <LinearGradient
              style={styles.gradientBorder}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              colors={disabled ? [THEME.GREY04, THEME.GREY04] : ['#74ebe4', THEME.PRIMARY]}>
              <View
                style={[
                  styles.gradientBorderInner,
                  { backgroundColor: pressed ? '#E8EDFF' : THEME.WHITE },
                ]}>
                {loading && (
                  <ActivityIndicator
                    style={{
                      position: 'absolute',
                      alignSelf: 'center',
                    }}
                    color={THEME.PRIMARY}
                  />
                )}
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    textAlign: 'center',
                    color: disabled ? THEME.GREY03 : THEME.PRIMARY,
                    opacity: loading ? 0 : 1,
                  }}>
                  {label}
                </Text>
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
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
  gradientBorderInner: {
    position: 'relative',
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '99%',
    margin: 1,
    borderRadius: 20,
  },
});

export default BoxButton;
