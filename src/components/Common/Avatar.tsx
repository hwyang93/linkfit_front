import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';

interface AvatarProps extends ImageProps {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 40,
  style,
  ...props
}) => {
  return (
    <Image
      style={[{borderRadius: 32, width: size, height: size}, style]}
      source={source}
      {...props}
    />
  );
};

export default Avatar;
