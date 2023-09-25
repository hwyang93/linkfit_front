import PostCarouselItem from '@components/PostCarouselItem';
import { FlatList } from 'react-native';

interface PostCarouselProps {
  links: any[];
  gap: number;
  offset: number;
  pageWidth: number;
}

const PostCarousel: React.FC<PostCarouselProps> = ({ links, pageWidth, gap }) => {
  const renderItem = ({ item }: any) => {
    return <PostCarouselItem item={item} />;
  };

  return (
    <FlatList
      automaticallyAdjustContentInsets={false}
      keyExtractor={(_, index) => index.toString()}
      data={links}
      decelerationRate="fast"
      horizontal
      renderItem={renderItem}
      snapToInterval={pageWidth + gap}
      snapToAlignment="start"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 0,
      }}
    />
  );
};

export default PostCarousel;
