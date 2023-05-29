import {fetchBookmarkRecruits} from '@api/recruit';
import RecruitCarouselItem from '@components/RecruitCarouselItem';
import {useCallback, useEffect, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';

const BookmarkJobOfferComponent: React.FC = () => {
  const [bookmarkedRecruits, setBookmarkedRecruits] = useState<any[]>();

  const getBookmarkRecruits = useCallback(() => {
    fetchBookmarkRecruits()
      .then(({data}: any) => {
        setBookmarkedRecruits(data);
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }, []);

  useEffect(() => {
    getBookmarkRecruits();
  }, [getBookmarkRecruits]);

  const renderItem = ({item}: any) => {
    return <RecruitCarouselItem item={item} />;
  };

  return (
    <FlatList
      data={bookmarkedRecruits}
      renderItem={renderItem}
      numColumns={2}
      keyExtractor={item => 'bookmarkedRecruit' + item.seq}
      ItemSeparatorComponent={() => <View style={{marginBottom: 16}} />}
    />
  );
};

export default BookmarkJobOfferComponent;
