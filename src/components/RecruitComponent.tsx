import {FlatList, Text, View} from 'react-native';
import RecruitListItem from '@components/RecruitListItem';
import common from '@styles/common';

type InstructorProps = {
  list: any[];
  title: string;
  text: string;
};

function RecruitComponent({list, title, text}: InstructorProps) {
  function renderItem({item}: any) {
    return <RecruitListItem item={item} />;
  }

  return (
    <FlatList
      data={list}
      decelerationRate="fast"
      renderItem={renderItem}
      snapToAlignment="start"
      numColumns={2}
      ListHeaderComponent={
        <View style={{paddingVertical: 16}}>
          <Text style={[common.title]}>{title}</Text>
          <Text style={common.text_m}>{text}</Text>
        </View>
      }
      showsVerticalScrollIndicator={false}
    />
  );
}

export default RecruitComponent;
