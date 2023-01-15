import {FlatList} from 'react-native';
import RecruitListItem from './RecruitListItem';

type CarouselProps = {
  gap: number;
  offset: number;
  links: any[];
  pageWidth: number;
};

function Carousel({links, pageWidth, gap}: CarouselProps) {
  function renderItem({item}: any) {
    return <RecruitListItem item={item} />;
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
    />
  );
}

export default Carousel;
