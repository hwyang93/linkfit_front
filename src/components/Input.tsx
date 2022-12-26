import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import common from '../styles/common';
import {INPUT} from '../styles/colors';

export const KeyboardTypes = {
  DEFAULT: 'default',
  EMAIL: 'email-address',
  PASSWORD: 'password',
};
export const ReturnKeyTypes = {
  DONE: 'done',
  NEXT: 'next',
};

type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: any;
  keyboardType: any;
  secureTextEntry?: boolean;
  isEmail?: Boolean;
};

const Input = ({
  label,
  placeholder,
  value,
  isEmail,
  // onChangeText,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  //test

  useEffect(() => {
    console.log(isEmail);
    console.log(value);
    if (isEmail) {
      setIsCorrect(true);
    }
  }, [isEmail, value]);
  return (
    <View style={common.inputWrapper}>
      <Text style={[common.label]}>{label}</Text>
      <TextInput
        {...props}
        style={[common.textInput]}
        value={value}
        placeholderTextColor="#acacac"
        importantForAutofill="yes"
        clearButtonMode="while-editing"
        autoCapitalize="none"
        blurOnSubmit={false}
        placeholder={placeholder}
        // onChangeText={onChangeText}
        textContentType={'none'}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      />
    </View>
  );
};

Input.defaultProps = {
  returnKeyType: ReturnKeyTypes.DONE,
};

const styles = StyleSheet.create({
  focusedLabel: {
    color: INPUT.DEFAULT,
  },
  successLabel: {
    color: INPUT.DEFAULT,
  },
  cautionLabel: {
    color: INPUT.CAUTION,
  },
  focusedInput: {
    borderColor: INPUT.DEFAULT,
  },
  cautionInput: {
    borderColor: INPUT.CAUTION,
  },
});

export default Input;
