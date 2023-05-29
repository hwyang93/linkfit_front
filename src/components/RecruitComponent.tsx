import {FetchRecruitsResponse} from '@/types/api/recruit';
import RecruitListItem from '@components/RecruitListItem';
import common from '@styles/common';
import {FlatList, Text, View} from 'react-native';

interface RecruitComponentProps {
  list: FetchRecruitsResponse;
  title: string;
  text: string;
}

const RecruitComponent: React.FC<RecruitComponentProps> = ({
  list,
  title,
  text,
}) => {
  const renderItem = ({item}: any) => {
    return <RecruitListItem item={item} />;
  };

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
};

export default RecruitComponent;
