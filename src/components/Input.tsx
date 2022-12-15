import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {height, width} from '../styles/common';

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
  emailMessage: string;
  value: string;
  onChangeText: any;
  keyboardType: any;
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
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#acacac"
        importantForAutofill="yes"
        autoComplete="email"
        clearButtonMode="while-editing"
        blurOnSubmit={false}
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        // onChangeText={onChangeEmail}
        // textContentType="emailAddress"
        // value={email}
        // returnKeyType="returnKeyType"
        // onSubmitEditing={() => passwordRef.current?.focus()}
      />
      {/*{!isEmail && <Text style={styles.cautionText}>{emailMessage}</Text>}*/}
    </View>
  );
};

Input.defaultProps = {
  returnKeyType: ReturnKeyTypes.DONE,
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
  },
  label: {
    position: 'absolute',
    paddingHorizontal: 4,
    top: -4,
    left: 16,
    color: '#acacac',
    fontSize: +width * 12,
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    zIndex: 10,
  },
  textInput: {
    padding: 16,
    width: '100%',
    height: +height * 56,
    borderWidth: 2,
    borderColor: '#dcdcdc',
    borderRadius: 8,
  },
});

export default Input;
