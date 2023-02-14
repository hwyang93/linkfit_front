import {FlatList, View} from 'react-native';
import RecruitCarouselItem from '@components/RecruitCarouselItem';

type dataProps = {
  data: any[];
  num: number;
  position: string;
  company: string;
  area: string;
  src: string;
};

function BookmarkJobOfferComponent({data}: dataProps) {
  function renderItem({item}: any) {
    return <RecruitCarouselItem item={item} />;
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      numColumns={2}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={{marginBottom: 16}} />}
    />
  );
}

export default BookmarkJobOfferComponent;
