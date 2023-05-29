import {FetchCommunityPostResponse} from '@/types/api/community';
import {fetchCommunityPost} from '@api/community';
import CommunityPostTop from '@components/Community/CommunityPostTop';
import CommunityUserComponent from '@components/Community/CommunityUserComponent';
import ReplyComponent from '@components/Community/ReplyComponent';
import Modal from '@components/ModalSheet';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, 'CommunityPost'>;

const CommunityPostScreen = ({route}: Props) => {
  const [post, setPost] = useState<FetchCommunityPostResponse>();
  const [modalVisible, setModalVisible] = useState(false);

  const getPost = useCallback(() => {
    fetchCommunityPost(route.params.postSeq)
      .then(({data}) => {
        setPost(data);
      })
      .catch(error => {
        if (isAxiosError(error)) {
          toast.error({message: error.message});
        }
      });
  }, [route.params.postSeq]);

  useEffect(() => {
    getPost();
  }, [getPost]);

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

  return (
    <View style={styles.container}>
      <FlatList
        data={post?.comments}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <View>
              <CommunityUserComponent writerInfo={item.writer} />
              <ReplyComponent commentInfo={item} />
            </View>
          );
        }}
        ListHeaderComponent={post && <CommunityPostTop postInfo={post} />}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default CommunityPostScreen;
