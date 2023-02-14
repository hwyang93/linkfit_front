import {FlatList} from 'react-native';
import RecruitCarouselItem from '@components/RecruitCarouselItem';

type CarouselProps = {
  links: any[];
  gap: number;
  offset?: number;
  pageWidth: number;
};

function Carousel({links, pageWidth, gap}: CarouselProps) {
  function renderItem({item}: any) {
    return <RecruitCarouselItem item={item} />;
  }

  return (
    <FlatList
      automaticallyAdjustContentInsets={false}
      data={links}
      decelerationRate="fast"
      horizontal
      renderItem={renderItem}
      snapToInterval={pageWidth + gap}
      snapToAlignment="start"
      showsHorizontalScrollIndicator={false}
      // contentContainerStyle={{
      //   paddingHorizontal: offset + gap / 2,
      // }}
    />
  );
}

export default Carousel;
