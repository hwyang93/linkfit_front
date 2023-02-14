import {FlatList, Text, View} from 'react-native';
import InstructorListItem from './InstructorListItem';
import common from '@styles/common';

type InstructorProps = {
  list: any[];
  title?: string;
  text?: string;
};

function InstructorComponent({list, title, text}: InstructorProps) {
  function renderItem({item}: any) {
    return <InstructorListItem item={item} />;
  }

  return (
    <FlatList
      nestedScrollEnabled={true}
      data={list}
      keyExtractor={(item, index) => index.toString()}
      decelerationRate="fast"
      renderItem={renderItem}
      snapToAlignment="start"
      ItemSeparatorComponent={() => <View style={common.separator} />}
      ListHeaderComponent={
        <View style={common.mt16}>
          <Text style={[common.title]}>{title}</Text>
          <Text style={common.text_m}>{text}</Text>
        </View>
      }
    />
  );
}

export default InstructorComponent;
