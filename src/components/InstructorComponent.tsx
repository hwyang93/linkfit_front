import {FetchInstructorsResponse, Instructor} from '@/types/api/instructor';
import common from '@styles/common';
import {FlatList, Text, View} from 'react-native';
import InstructorListItem from './InstructorListItem';

type InstructorProps = {
  list: FetchInstructorsResponse;
  title?: string;
  text?: string;
};

const InstructorComponent = ({list, title, text}: InstructorProps) => {
  const renderItem = ({item}: {item: Instructor}) => {
    return <InstructorListItem item={item} />;
  };

  return (
    <FlatList
      nestedScrollEnabled={true}
      data={list}
      keyExtractor={(_, index) => index.toString()}
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
};

export default InstructorComponent;
