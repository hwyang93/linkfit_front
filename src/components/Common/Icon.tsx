import React from 'react';
import {Image, ImageProps, ImageSourcePropType} from 'react-native';

interface IconProps extends ImageProps {
  source: ImageSourcePropType;
  size?: number;
}

const Icon: React.FC<IconProps> = ({source, size = 24, style, ...props}) => {
  return (
    <Image
      source={source}
      style={[{width: size, height: size}, style]}
      {...props}
    />
  );
};

export default Icon;
