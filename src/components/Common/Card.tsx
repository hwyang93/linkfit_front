import {GRAY} from '@/styles/colors';
import React from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const Card: React.FC<Props> = ({children, style, onPress, ...props}) => {
  return (
    <Pressable
      style={[
        {
          padding: 16,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: GRAY.DEFAULT,
        },
        style,
      ]}
      onPress={onPress}
      {...props}>
      {children}
    </Pressable>
  );
};

export default Card;
