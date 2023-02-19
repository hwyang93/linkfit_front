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
import {SetStateAction, useState} from 'react';
import Modal from '@components/ModalSheet';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import BookmarkCounter from '@components/Counter/BookmarkCounter';
import CommentCounter from '@components/Counter/CommentCounter';

function CommunityMyPost() {
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const openModal = () => {
    setModalVisible(true);
  };

  const DATA = [
    {
      id: 1,
      type: '센터',
      title: '게시글 제목',
      companyName: '호랑이요가',
      date: '2022.12.12',
      content:
        '게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다.',
      channel: '요가',
    },
    {
      id: 2,
      type: '강사',
      title: '게시글 제목인겨 아닌겨',
      nickname: '서당개4년',
      date: '2022.12.12',
      content:
        '게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. ',
      channel: '필라테스',
    },
  ];

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
        data={DATA}
        renderItem={({item}) => {
          return (
            <View style={styles.postBox}>
              <View>
                <Text style={[common.title, common.fs18, common.mb8]}>
                  {item.title}
                </Text>
                <View style={[common.rowCenter, common.mb12]}>
                  {item.type === '센터' ? (
                    <Text style={[common.text_m, common.fwb]}>
                      {item.companyName}
                    </Text>
                  ) : (
                    <Text style={[common.text_m, common.fwb]}>
                      {item.nickname}
                    </Text>
                  )}

                  <Text
                    style={[common.text, common.mh4, {alignSelf: 'flex-end'}]}>
                    {item.type}
                  </Text>
                  <Text style={[common.text, {alignSelf: 'flex-end'}]}>
                    {item.date}
                  </Text>
                </View>

                <Pressable style={common.mb10} onPress={textExpansion}>
                  <Text style={common.text_m} numberOfLines={textLine}>
                    {item.content}
                  </Text>
                </Pressable>

                <View style={common.rowCenterBetween}>
                  <View style={common.rowCenter}>
                    <BookmarkCounter counter={23} />
                    <CommentCounter counter={12} />
                  </View>
                  <View style={common.channelBox}>
                    <Text style={common.channelText}>{item.channel}</Text>
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
