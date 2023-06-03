import THEME from '@/styles/theme';
import React from 'react';
import {StyleProp, Text, View, ViewProps, ViewStyle} from 'react-native';

interface ChipProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  label: string;
}

const Chip: React.FC<ChipProps> = ({label, style, ...props}) => {
  return (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          paddingVertical: 4,
          paddingHorizontal: 8,
          marginBottom: 8,
          backgroundColor: '#d7e0fd',
          borderRadius: 12,
        },
        style,
      ]}
      {...props}>
      <Text
        style={{
          color: THEME.PRIMARY,
          fontSize: 10,
        }}>
        {label}
      </Text>
    </View>
  );
};

export default Chip;
