import { ROUTE } from '@/lib/constants/route';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import common from '@styles/common';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LoggedInParamList } from '../../AppInner';

interface PostCarouselItemProps {
  item: {
    id: number;
    title: string;
    companyName: string;
    nickname: string;
    type: string;
    date: string;
  };
}

const PostCarouselItem: React.FC<PostCarouselItemProps> = ({ item }) => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  return (
    <Pressable
      style={styles.postBox}
      onPress={() => navigation.navigate(ROUTE.COMMUNITY.POST_DETAIL, { postId: item.id })}>
      <Text numberOfLines={1} style={common.text_m}>
        {item.title}
      </Text>
      <View style={[common.rowEnd, common.mt40]}>
        {item.nickname ? (
          <Text style={[common.text_s, common.fwb]}>{item.nickname}</Text>
        ) : (
          <Text style={[common.text_s, common.fwb]}>{item.companyName}</Text>
        )}
        <Text style={[common.text, common.mh4]}>{item.type}</Text>
        <Text style={common.text}>{item.date}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  postBox: {
    backgroundColor: '#e8edff',
    borderRadius: 8,
    marginRight: 12,
    padding: 16,
    width: 208,
  },
});

export default PostCarouselItem;
