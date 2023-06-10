import React, {PropsWithChildren} from 'react';
import {ScrollView, View} from 'react-native';

const FilterChipContainer: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <View>
      <ScrollView
        horizontal
        contentContainerStyle={{paddingHorizontal: 16, marginVertical: 8}}
        showsHorizontalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
};

export default FilterChipContainer;
