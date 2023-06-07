import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  StyleProp,
} from 'react-native';

interface AvatarProps extends ImageProps {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  size?: number;
  onPress?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 40,
  style,
  onPress,
  ...props
}) => {
  return (
    <Pressable onPress={onPress}>
      <Image
        style={[{borderRadius: size / 2, width: size, height: size}, style]}
        source={source}
        {...props}
      />
    </Pressable>
  );
};

export default Avatar;
