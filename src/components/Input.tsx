import {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import common from '@styles/common';
import {INPUT} from '@styles/colors';

export const KeyboardTypes = {
  DEFAULT: 'default',
  EMAIL: 'email-address',
  PHONE: 'phone-pad',
  NUMBER: 'number-pad',
};
export const ReturnKeyTypes = {
  DONE: 'done',
  NEXT: 'next',
};

type InputProps = {
  pointerEvents?: any;
  label?: string;
  placeholder: string;
  value?: any;
  onChangeText?: any;
  keyboardType?: any;
  secureTextEntry?: boolean;
  isEmail?: boolean;
  propStyles?: {
    inputWrapper?: object;
  };
  onSubmitEditing?: any;
  blurOnSubmit?: boolean;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
};

const Input = ({
  label,
  placeholder,
  value,
  propStyles,
  pointerEvents,
  editable,
  multiline,
  numberOfLines,
  maxLength,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  // console.log('style : ', propStyles);

  const onBlur = () => {
    setIsFocused(false);
  };
  const onFocus = () => {
    setIsFocused(true);
  };

  return (
    <View style={[common.inputWrapper, propStyles?.inputWrapper]}>
      {label ? (
        <Text
          style={[
            common.label,
            {color: value || isFocused ? INPUT.FOCUS : INPUT.DEFAULT},
            // {color: value && !isFocused ? INPUT.DEFAULT : INPUT.DEFAULT},
          ]}>
          {label}
        </Text>
      ) : null}
      <TextInput
        {...props}
        style={[
          common.textInput,
          {borderColor: value || isFocused ? INPUT.FOCUS : INPUT.DEFAULT},
          multiline && styles.multiline,
          // {borderColor: value && !isFocused ? INPUT.DEFAULT : INPUT.DEFAULT},
        ]}
        value={value}
        placeholderTextColor="#acacac"
        importantForAutofill="yes"
        clearButtonMode="while-editing"
        autoCapitalize="none"
        blurOnSubmit={false}
        placeholder={placeholder}
        textContentType={'none'}
        pointerEvents={pointerEvents}
        onBlur={onBlur}
        onFocus={onFocus}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
      />
    </View>
  );
};

Input.defaultProps = {
  returnKeyType: ReturnKeyTypes.DONE,
};

const styles = StyleSheet.create({
  multiline: {
    minHeight: 276,
    textAlignVertical: 'top',
    paddingTop: 16,
    paddingBottom: 16,
  },
});

export default Input;
