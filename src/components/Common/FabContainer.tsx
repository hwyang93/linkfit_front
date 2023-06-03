import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

interface FabContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const FabContainer: React.FC<FabContainerProps> = ({children, style}) => {
  return (
    <View
      style={[
        {
          position: 'absolute',
          alignItems: 'flex-end',
          bottom: 32,
          right: 16,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default FabContainer;
