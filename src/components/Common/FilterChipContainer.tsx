import React, {PropsWithChildren} from 'react';
import {ScrollView, View} from 'react-native';

const FilterChipContainer: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <View>
      <ScrollView
        horizontal
        contentContainerStyle={{marginHorizontal: 16, marginVertical: 8}}>
        {children}
      </ScrollView>
    </View>
  );
};

export default FilterChipContainer;
