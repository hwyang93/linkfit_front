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
  propStyles?: {
    inputWrapper?: object;
  };
  onSubmitEditing?: Function;
};

const Input = ({
  label,
  placeholder,
  value,
  propStyles,
  // onChangeText,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  console.log('style', propStyles);

  const onBlur = () => {
    setIsFocused(false);
  };
  const onFocus = () => {
    setIsFocused(true);
  };

  return (
    <View style={[common.inputWrapper, propStyles?.inputWrapper]}>
      <Text
        style={[
          common.label,
          {color: value || isFocused ? INPUT.SUCCESS : INPUT.DEFAULT},
        ]}>
        {label}
      </Text>
      <TextInput
        {...props}
        style={[
          common.textInput,
          {borderColor: value || isFocused ? INPUT.SUCCESS : INPUT.DEFAULT},
        ]}
        value={value}
        placeholderTextColor="#acacac"
        importantForAutofill="yes"
        clearButtonMode="while-editing"
        autoCapitalize="none"
        blurOnSubmit={false}
        placeholder={placeholder}
        // onChangeText={onChangeText}
        textContentType={'none'}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </View>
  );
};

Input.defaultProps = {
  returnKeyType: ReturnKeyTypes.DONE,
};

export default Input;
