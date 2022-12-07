import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

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
  isEmail: boolean;
};

const Input = ({
  label,
  placeholder,
  emailMessage,
  value,
  onChangeText,
  isEmail,
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
        // onChangeText={onChangeEmail}
        // textContentType="emailAddress"
        // value={email}
        // returnKeyType="returnKeyType"
        // onSubmitEditing={() => passwordRef.current?.focus()}
      />
      {!isEmail && <Text style={styles.cautionText}>{emailMessage}</Text>}
    </View>
  );
};

Input.defaultProps = {
  returnKeyType: ReturnKeyTypes.DONE,
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    marginTop: 10,
    marginBottom: 40,
    // padding: 20,
  },
  label: {
    position: 'absolute',
    paddingHorizontal: 4,
    top: -4,
    left: 16,
    color: '#acacac',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    zIndex: 10,
    // marginBottom: 20,
  },
  textInput: {
    padding: 16,
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cautionText: {
    color: '#cc1212',
    fontSize: 12,
    paddingTop: 4,
    paddingLeft: 16,
  },
});

export default Input;
