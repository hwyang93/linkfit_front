import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
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
      type: '게시글',
      title: '게시글 제목',
      date: '2022.12.12',
      content:
        '게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다. 게시글 내용입니다.',
    },
    {
      id: 2,
      type: '댓글',
      title: '게시글 인겨 아닌겨',
      date: '2022.12.12',
      content:
        '댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. 댓글 내용입니다. ',
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
              <View style={[common.rowCenter, common.mb12]}>
                {item.type === '게시글' && (
                  <Text style={[common.text_m, common.fwb, common.mr8]}>
                    {item.title}
                  </Text>
                )}
                <Text style={[common.text]}>{item.date}</Text>
              </View>

              <Pressable onPress={textExpansion}>
                <Text style={common.text_m} numberOfLines={textLine}>
                  {item.content}
                </Text>
              </Pressable>

              <Pressable
                style={styles.kebabIcon}
                hitSlop={10}
                onPress={openModal}>
                <Image source={iconPath.KEBAB} style={[common.KEBAB]} />
              </Pressable>
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
