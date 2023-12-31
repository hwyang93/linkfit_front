import React from 'react';
import { Keyboard, StyleProp, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

interface DismissKeyboardViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const DismissKeyboardView: React.FC<DismissKeyboardViewProps> = ({ children, style, ...props }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView style={style} {...props}>
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
