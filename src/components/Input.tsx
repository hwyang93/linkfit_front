import React from 'react';
import {Text, TextInput, View} from 'react-native';
import common from '../styles/common';

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
  // isEmail: Boolean;
};

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  ...props
}: InputProps) => {
  return (
    <View style={common.inputWrapper}>
      <Text style={[common.label]}>{label}</Text>
      <TextInput
        {...props}
        // style={[styles.textInput, isEmail ? styles.success : styles.caution]}
        style={[common.textInput]}
        value={value}
        placeholderTextColor="#acacac"
        importantForAutofill="yes"
        clearButtonMode="while-editing"
        autoCapitalize="none"
        blurOnSubmit={false}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

Input.defaultProps = {
  returnKeyType: ReturnKeyTypes.DONE,
};

export default Input;
