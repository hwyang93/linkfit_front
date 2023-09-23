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
  textInput: {
    padding: 16,
    paddingTop: 16,
    width: '100%',
    height: 56,
    fontSize: 16,
    borderWidth: 2,
    borderColor: THEME.GREY04,
    borderRadius: 8,
  },
  label: {
    position: 'absolute',
    paddingHorizontal: 4,
    top: -4,
    left: 16,
    color: THEME.GREY04,
    fontSize: 12,
    backgroundColor: THEME.WHITE,
    zIndex: 10,
  },
  startIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
  },
  errorMessage: {
    position: 'absolute',
    bottom: -18,
    left: 12,
    color: THEME.ERROR,
    fontSize: 12,
  },
});

export default TextField;
