import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import common from '@styles/common';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import {iconPath} from '@util/iconPath';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import Modal from '@components/ModalSheet';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import BookmarkCounter from '@components/Counter/BookmarkCounter';
import CommentCounter from '@components/Counter/CommentCounter';
import {fetchBookmarkCommunities} from '@api/community';
import toast from '@hooks/toast';

function CommunityMyPost() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const openModal = () => {
    setModalVisible(true);
  };

  const getBookmarks = useCallback(() => {
    fetchBookmarkCommunities()
      .then(({data}: any) => {
        setBookmarks(data);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, []);

  useEffect(() => {
    getBookmarks();
  }, []);

  const MODAL = [
    {
      value: '수정하기',
      job: () => {
        setModalVisible(false);
        Alert.alert('text', '수정하라!');
      },
    },
    {
      value: '삭제하기',
      job: () => Alert.alert('text', '삭제하라!'),
    },
  ];

  const [textLine, setTextLine] = useState(2);
  const textExpansion = () => {
    if (textLine === 2) {
      setTextLine(0);
    } else {
      setTextLine(2);
    }
  };

  type Props = [
    {id: number; type: string; title: string; date: string; content: string},
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        renderItem={({item}) => {
          return (
            <View style={styles.postBox}>
              <View>
                <Text style={[common.title, common.fs18, common.mb8]}>
                  {item.community.title}
                </Text>
                <View style={[common.rowCenter, common.mb12]}>
                  {item.community.writer.type === 'COMPANY' ? (
                    <Text style={[common.text_m, common.fwb]}>
                      {item.community.writer.company.companyName}
                    </Text>
                  ) : (
                    <Text style={[common.text_m, common.fwb]}>
                      {item.community.writer.nickname
                        ? item.community.writer.nickname
                        : item.community.writer.name}
                    </Text>
                  )}

                  <Text
                    style={[common.text, common.mh4, {alignSelf: 'flex-end'}]}>
                    {item.community.writer.type === 'COMPANY'
                      ? '센터'
                      : item.community.writer.type === 'INSTRUCTOR'
                      ? '강사'
                      : '일반인'}
                  </Text>
                  <Text style={[common.text, {alignSelf: 'flex-end'}]}>
                    {item.community.updatedAt}
                  </Text>
                </View>

                <Pressable style={common.mb10} onPress={textExpansion}>
                  <Text style={common.text_m} numberOfLines={textLine}>
                    {item.community.contents}
                  </Text>
                </Pressable>

                <View style={common.rowCenterBetween}>
                  <View style={common.rowCenter}>
                    <BookmarkCounter
                      counter={item.community.bookmarks.length}
                    />
                    <CommentCounter counter={item.community.comments.length} />
                  </View>
                  <View style={common.channelBox}>
                    <Text style={common.channelText}>
                      {item.community.category}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'더보기'}
        modalData={MODAL}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: WHITE},
  postBox: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: GRAY.DEFAULT,
  },
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default CommunityMyPost;
