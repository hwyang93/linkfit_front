import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {height, width} from '../styles/common';
import {CAUTION, SUCCESS} from '../styles/colors';

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
  isEmail: Boolean;
};

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  // isEmail,
  ...props
}: InputProps) => {
  return (
    <View style={styles.inputWrapper}>
      <Text style={[styles.label]}>{label}</Text>
      <TextInput
        {...props}
        // style={[styles.textInput, isEmail ? styles.success : styles.caution]}
        style={[styles.textInput]}
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
    // borderColor: isEmail ? SUCCESS.success : CAUTION.caution,
    borderRadius: 8,
  },
  caution: {
    borderColor: '#e20823',
  },
  success: {
    borderColor: '#3962f3',
  },
});
const caution = StyleSheet.create({
  input: {
    borderColor: '#e20823',
  },
  label: {
    color: '#e20823',
  },
});

const success = StyleSheet.create({
  input: {
    borderColor: '##3962f3',
  },
  label: {
    color: '##3962f3',
  },
});

// const funcStyle = (isEmail: Boolean) =>
//   StyleSheet.create({
//     border: {
//       borderColor: isEmail ? '#3962f3' : 'e20823',
//     },
//
//     color: {
//       color: isEmail ? '#3962f3' : 'e20823',
//     },
//   });

export default Input;
