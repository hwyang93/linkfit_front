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
import {GRAY, WHITE} from '@styles/colors';
import {iconPath} from '@util/iconPath';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import Modal from '@components/ModalSheet';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {fetchCommunityPosts} from '@api/community';
import toast from '@hooks/toast';

function CommunityMyPost() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const [posts, setPosts] = useState<any[]>([]);

  const openModal = () => {
    setModalVisible(true);
  };

  const getPosts = useCallback(() => {
    fetchCommunityPosts({isWriter: 'Y'})
      .then(({data}: any) => {
        setPosts(data);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, []);

  useEffect(() => {
    getPosts();
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
        data={posts}
        renderItem={({item}) => {
          return (
            <View style={styles.postBox}>
              <View style={[common.rowCenter, common.mb12]}>
                <Text style={[common.text_m, common.fwb, common.mr8]}>
                  {item.title}
                </Text>
                <Text style={[common.text]}>{item.updatedAt}</Text>
              </View>

              <Pressable onPress={textExpansion}>
                <Text style={common.text_m} numberOfLines={textLine}>
                  {item.contents}
                </Text>
              </Pressable>

              <Pressable
                style={styles.kebabIcon}
                hitSlop={10}
                onPress={openModal}>
                <Image source={iconPath.KEBAB} style={[common.size24]} />
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
