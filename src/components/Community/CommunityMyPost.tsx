import useModal from '@/hooks/useModal';
import {FetchCommunityPostsResponse} from '@/types/api/community';
import {iconPath} from '@/utils/iconPath';
import {dateFormatter} from '@/utils/util';
import {fetchCommunityPosts} from '@api/community';
import toast from '@hooks/toast';
import {GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BottomSheet from '../Common/BottomSheet';

const CommunityMyPost: React.FC = () => {
  const [posts, setPosts] = useState<FetchCommunityPostsResponse>([]);
  const [textLine, setTextLine] = useState(2);

  // const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const {modalVisible, openModal, closeModal} = useModal();

  const getPosts = useCallback(() => {
    fetchCommunityPosts({isWriter: 'Y'})
      .then(({data}) => {
        setPosts(data);
      })
      .catch(error => {
        toast.error({message: error.message});
      });
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const textExpansion = () => {
    if (textLine === 2) {
      setTextLine(0);
    } else {
      setTextLine(2);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({item}) => {
          return (
            <View style={styles.postBox}>
              <View style={[common.row, common.mb12]}>
                <Text style={[common.text_m, common.fwb, common.mr4]}>
                  {item.title}
                </Text>
                <Text style={[common.text, {alignSelf: 'flex-end'}]}>
                  {dateFormatter(item.updatedAt, 'YYYY.MM.DD')}
                </Text>
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
      <BottomSheet
        visible={modalVisible}
        onDismiss={closeModal}
        title="더보기"
        content={
          <ScrollView
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}>
            <View style={{paddingHorizontal: 16}}>
              <Text style={{padding: 16, fontSize: 18}}>수정하기</Text>
              <Text style={[{padding: 16, fontSize: 18}]}>삭제하기</Text>
            </View>
          </ScrollView>
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 16, backgroundColor: WHITE},
  postBox: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: GRAY.DEFAULT,
  },
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default CommunityMyPost;
