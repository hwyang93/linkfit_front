import React from 'react';
import {StyleProp, View, ViewProps, ViewStyle} from 'react-native';

interface DividerProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
}

const Divider: React.FC<DividerProps> = ({style, ...props}) => {
  return (
    <View style={[{height: 1, backgroundColor: '#dcdcdc'}, style]} {...props} />
  );
};

export default Divider;
