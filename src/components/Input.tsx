import {iconPath} from '@/utils/iconPath';
import {GRAY, INPUT} from '@styles/colors';
import common from '@styles/common';
import {useState} from 'react';
import {
  Image,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export const KeyboardTypes: Record<string, KeyboardTypeOptions> = {
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
  comment?: boolean;
  icon?: string;
  textAlign?: any;
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
  comment,
  icon,
  textAlign,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

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
            {color: value || isFocused ? INPUT.FOCUS : GRAY.LIGHT},
            // {color: value && !isFocused ? INPUT.DEFAULT : INPUT.DEFAULT},
          ]}>
          {label}
        </Text>
      ) : null}
      {icon !== 'time' ? null : (
        <View style={{position: 'absolute', left: 16, top: 16}}>
          <Image source={iconPath.TIME} style={[common.size24]} />
        </View>
      )}
      {icon !== 'day' ? null : (
        <View style={{position: 'absolute', left: 16, top: 16}}>
          <Image source={iconPath.DAY} style={[common.size24]} />
        </View>
      )}
      <TextInput
        {...props}
        style={[
          common.textInput,
          {
            borderColor: value || isFocused ? INPUT.FOCUS : GRAY.LIGHT,
            paddingLeft: icon && 50,
          },
          multiline && styles.multiline,
          comment && styles.comment,

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
        textAlign={textAlign}
      />
    </View>
  );
};

Input.defaultProps = {
  returnKeyType: ReturnKeyTypes.DONE,
};

const styles = StyleSheet.create({
  multiline: {
    height: 276,
    textAlignVertical: 'top',
    paddingTop: 16,
  },
  comment: {
    height: 40,
    paddingVertical: 0,
  },
});

export default Input;
