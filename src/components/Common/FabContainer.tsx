import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';

const FabContainer: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <View
      style={{
        position: 'absolute',
        alignItems: 'flex-end',
        bottom: 32,
        right: 16,
      }}>
      {children}
    </View>
  );
};

export default FabContainer;
