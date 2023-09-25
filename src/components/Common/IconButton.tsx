import React from 'react';
import { ImageSourcePropType, Pressable, PressableProps } from 'react-native';
import Icon from './Icon';

interface IconButtonProps extends PressableProps {
  source: ImageSourcePropType;
  size?: number;
  onPress?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ source, size = 24, onPress, ...props }) => {
  return (
    <Pressable onPress={onPress} {...props}>
      <Icon source={source} size={size} />
    </Pressable>
  );
};

export default IconButton;
