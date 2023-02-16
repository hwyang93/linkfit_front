import {FlatList} from 'react-native';
import PostCarouselItem from '@components/PostCarouselItem';

type CarouselProps = {
  links: any[];
  gap: number;
  offset?: number;
  pageWidth: number;
};

function PostCarousel({links, pageWidth, gap}: CarouselProps) {
  function renderItem({item}: any) {
    return <PostCarouselItem item={item} />;
  }

  return (
    <FlatList
      automaticallyAdjustContentInsets={false}
      keyExtractor={(item, index) => index.toString()}
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

export default PostCarousel;
