import React from 'react';
import {Text, View} from 'react-native';

const EmptyState: React.FC = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
      }}>
      <Text style={{textAlign: 'center'}}>아무것도 없습니다</Text>
    </View>
  );
};

export default EmptyState;
