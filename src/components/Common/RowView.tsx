import React from 'react';
import { View, ViewProps } from 'react-native';

const RowView: React.FC<ViewProps> = ({ children, style, ...props }) => {
  return (
    <View style={[{ flexDirection: 'row' }, style]} {...props}>
      {children}
    </View>
  );
};

export default RowView;
