import React, {PropsWithChildren} from 'react';
import {ScrollView} from 'react-native';

const FilterChipContainer: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{marginHorizontal: 16, marginVertical: 8}}>
      {children}
    </ScrollView>
  );
};

export default FilterChipContainer;
