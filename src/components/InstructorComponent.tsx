import React from 'react';
import {FlatList} from 'react-native';
import InstructorListItem from './InstructorListItem';

type InstructorProps = {
  list: any[];
};

function InstructorComponent({list}: InstructorProps) {
  function renderItem({item}: any) {
    return <InstructorListItem item={item} />;
  }

  return (
    <FlatList
      automaticallyAdjustContentInsets={false}
      data={list}
      decelerationRate="fast"
      renderItem={renderItem}
      snapToAlignment="start"
      showsHorizontalScrollIndicator={false}
    />
  );
}

export default InstructorComponent;
