import { BLUE } from '@/styles/colors';
import React from 'react';
import { ActivityIndicator, StyleProp, View, ViewProps, ViewStyle } from 'react-native';

interface LoadingFallbackProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({ style, ...props }) => {
  return (
    <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }, style]} {...props}>
      <ActivityIndicator color={BLUE.DEFAULT} />
    </View>
  );
};

export default LoadingFallback;
