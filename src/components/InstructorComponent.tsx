import React from 'react';
import {FlatList, View} from 'react-native';
import InstructorListItem from './InstructorListItem';
import common from '@styles/common';

type InstructorProps = {
  list: any[];
};

function InstructorComponent({list}: InstructorProps) {
  function renderItem({item}: any) {
    return <InstructorListItem item={item} />;
  }

  return (
    <FlatList
      nestedScrollEnabled={true}
      // automaticallyAdjustContentInsets={false}
      data={list}
      decelerationRate="fast"
      renderItem={renderItem}
      snapToAlignment="start"
      ItemSeparatorComponent={() => <View style={common.separator} />}
      // showsHorizontalScrollIndicator={false}
    />
  );
}

export default InstructorComponent;
