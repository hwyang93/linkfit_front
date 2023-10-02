import THEME from '@/styles/theme';
import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

interface TextFieldProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  label?: string;
  errorMessage?: string;
  error?: boolean;
  height?: number;
}

const TextField: React.FC<TextFieldProps> = ({
  style,
  label,
  errorMessage,
  error = false,
  height,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const inputColor = error ? THEME.ERROR : isFocused ? THEME.PRIMARY : THEME.GREY04;

  return (
    <View style={[{ position: 'relative' }, style]}>
      {label && <Text style={[styles.label, { color: inputColor }]}>{label}</Text>}
      <TextInput
        style={[
          styles.textInput,
          {
            color: error ? THEME.ERROR : THEME.GREY01,
            borderColor: inputColor,
            height: height,
          },
        ]}
        importantForAutofill="yes"
        clearButtonMode="while-editing"
        autoCapitalize="none"
        returnKeyType="done"
        blurOnSubmit={false}
        onBlur={onBlur}
        onFocus={onFocus}
        {...props}
      />
      {error && errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    bottom: -18,
    color: THEME.ERROR,
    fontSize: 12,
    left: 12,
    position: 'absolute',
  },
  label: {
    backgroundColor: THEME.WHITE,
    color: THEME.GREY04,
    fontSize: 12,
    left: 16,
    paddingHorizontal: 4,
    position: 'absolute',
    top: -4,
    zIndex: 10,
  },
  startIcon: {
    left: 16,
    position: 'absolute',
    top: 16,
  },
  textInput: {
    borderColor: THEME.GREY04,
    borderRadius: 8,
    borderWidth: 2,
    fontSize: 16,
    height: 56,
    padding: 16,
    paddingTop: 16,
    width: '100%',
  },
});

export default TextField;

interface TextFieldHelperTextProps {
  children: React.ReactNode;
  variant?: 'default' | 'placeholder' | 'error';
}

export const TextFieldHelperText: React.FC<TextFieldHelperTextProps> = ({
  children,
  variant = 'default',
}) => {
  const color = {
    default: THEME.GREY01,
    placeholder: THEME.GREY03,
    error: THEME.ERROR,
  };

  return (
    <Text
      style={{
        marginLeft: 16,
        marginTop: 4,
        color: color[variant],
      }}>
      {children}
    </Text>
  );
};
