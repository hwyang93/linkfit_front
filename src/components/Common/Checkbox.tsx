import common from '@/styles/common';
import {iconPath} from '@/utils/iconPath';
import React from 'react';
import {Image, Pressable, PressableProps} from 'react-native';

interface CheckboxProps extends PressableProps {
  checked?: boolean;
  onPress?: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onPress,
  ...props
}) => {
  return (
    <Pressable onPress={onPress} {...props}>
      {checked && <Image source={iconPath.CHECKED_BOX} style={common.size24} />}
      {!checked && <Image source={iconPath.CHECK_BOX} style={common.size24} />}
    </Pressable>
  );
};

export default Checkbox;
