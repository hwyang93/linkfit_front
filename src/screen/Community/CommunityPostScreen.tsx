import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import ReplyComponent from '@components/Community/ReplyComponent';
import CommunityUserComponent from '@components/Community/CommunityUserComponent';
import Modal from '@components/ModalSheet';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../../AppInner';
import {fetchCommunityPost} from '@api/community';
import toast from '@hooks/toast';
import CommunityPostTop from '@components/Community/CommunityPostTop';

type Props = NativeStackScreenProps<LoggedInParamList, 'CommunityPost'>;

function CommunityPostScreen({route, navigation}: Props) {
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);

  const [post, setPost] = useState<any>({});

  const getPost = useCallback(() => {
    fetchCommunityPost(route.params.postSeq)
      .then(({data}: any) => {
        setPost(data);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, [route.params.postSeq]);

  useEffect(() => {
    getPost();
  }, []);

  const MODAL = [
    {
      value: '차단하기',
      job: () => {
        setModalVisible(false);
        Alert.alert('text', '차단하라!!');
      },
    },
    {
      value: '신고하기',
      job: () => {
        setModalVisible(false);
        Alert.alert('text', '신고하라!!');
      },
    },
  ];

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={post.comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <View>
              <CommunityUserComponent writerInfo={item.writer} />
              <ReplyComponent commentInfo={item} />
            </View>
          );
        }}
        ListHeaderComponent={<CommunityPostTop item={post} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={[common.separator, common.mv16]} />
        )}
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default CommunityPostScreen;
