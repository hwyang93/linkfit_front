import {FlatList} from 'react-native';
import RecruitCarouselItem from '@components/RecruitCarouselItem';

type CarouselProps = {
  links: any[];
  gap: number;
  offset: number;
  pageWidth: number;
};

function RecruitCarousel({links, pageWidth, offset, gap}: CarouselProps) {
  function renderItem({item}: any) {
    return <RecruitCarouselItem item={item} />;
  }

  return (
    <FlatList
      automaticallyAdjustContentInsets={false}
      keyExtractor={(item, index) => index.toString()}
      data={links}
      decelerationRate="fast"
      horizontal
      renderItem={renderItem}
      snapToInterval={pageWidth * 2 - 8}
      snapToAlignment="start"
      showsHorizontalScrollIndicator={false}
      // contentContainerStyle={{
      //   paddingHorizontal: offset + gap / 2,
      // }}
    />
  );
}

export default RecruitCarousel;
