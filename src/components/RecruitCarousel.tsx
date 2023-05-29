import RecruitCarouselItem from '@components/RecruitCarouselItem';
import {FlatList} from 'react-native';

type CarouselProps = {
  links: any[];
  gap: number;
  offset: number;
  pageWidth: number;
};

function RecruitCarousel({links}: CarouselProps) {
  function renderItem({item}: any) {
    return <RecruitCarouselItem item={item} />;
  }

  return (
    <FlatList
      contentContainerStyle={{paddingHorizontal: 16}}
      keyExtractor={(_, index) => index.toString()}
      data={links}
      horizontal
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
    />
  );
}

export default RecruitCarousel;
