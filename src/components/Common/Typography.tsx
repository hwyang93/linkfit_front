import React from 'react';
import { Text } from 'react-native';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body1' | 'body2' | 'caption' | 'button';
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({ variant = 'body1', children }) => {
  return <Text>{children}</Text>;
};

export default Typography;
