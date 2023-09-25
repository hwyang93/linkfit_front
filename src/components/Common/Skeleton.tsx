import THEME from '@/styles/theme';
import React from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';

interface SkeletonProps extends ViewProps {
  variant: 'text' | 'circle' | 'rect';
  width: number;
  height: number;
  style?: StyleProp<ViewStyle>;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  width,
  height,
  style,
  ...props
}) => {
  return (
    <View
      style={[
        {
          backgroundColor: THEME.GREY04,
          borderRadius: variant === 'circle' ? width / 2 : 4,
          width: width,
          height: height,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default Skeleton;
