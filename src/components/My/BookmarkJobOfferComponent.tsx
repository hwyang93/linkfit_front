import {Alert, FlatList, View} from 'react-native';
import RecruitCarouselItem from '@components/RecruitCarouselItem';
import {useCallback, useEffect, useState} from 'react';
import {fetchBookmarkRecruits} from '@api/recruit';

function BookmarkJobOfferComponent() {
  const [bookmarkedRecruits, setBookmarkedRecruits] = useState<any[]>();

  const getBookmarkRecruits = useCallback(() => {
    fetchBookmarkRecruits()
      .then(({data}: any) => {
        setBookmarkedRecruits(data);
      })
      .catch((e: any) => {
        Alert.alert(e.message);
      });
  }, []);

  useEffect(() => {
    getBookmarkRecruits();
  }, [getBookmarkRecruits]);

  function renderItem({item}: any) {
    return <RecruitCarouselItem item={item} />;
  }

  return (
    <FlatList
      data={bookmarkedRecruits}
      renderItem={renderItem}
      numColumns={2}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={{marginBottom: 16}} />}
    />
  );
}

export default BookmarkJobOfferComponent;
