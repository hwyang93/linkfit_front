import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import RecruitCarouselItem from './RecruitCarouselItem';

type CarouselProps = {
  gap: number;
  offset: number;
  links: any[];
  pageWidth: number;
};

function Carousel({links, pageWidth, gap, offset}: CarouselProps) {
  const [page, setPage] = useState(0);

  function renderItem({item}: any) {
    return (
      <RecruitCarouselItem
        item={item}
        key={item.num}
        // style={{width: pageWidth, marginHorizontal: gap / 2}}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={
          {
            // paddingHorizontal: offset + gap / 2,
          }
        }
        data={links}
        decelerationRate="fast"
        horizontal
        // keyExtractor={(item: any) => `page__${item.color}`}
        keyExtractor={(item: any) => item.num}
        // onScroll={onScroll}
        // pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Carousel;
