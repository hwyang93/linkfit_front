import THEME from '@/styles/theme';
import React from 'react';
import { Text, View } from 'react-native';

interface EmptyStateProps {
  message: string;
  height?: number;
  fullHeight?: boolean;
}

// TODO: 플레이스홀더 이미지 추가

const EmptyState: React.FC<EmptyStateProps> = ({ message, height, fullHeight }) => {
  return (
    <View
      style={[
        {
          justifyContent: 'center',
          alignContent: 'center',
          height: height || 180,
        },
        fullHeight && { flex: 1 },
      ]}>
      <Text style={{ fontSize: 16, color: THEME.GREY02, textAlign: 'center' }}>{message}</Text>
    </View>
  );
};

export default EmptyState;
