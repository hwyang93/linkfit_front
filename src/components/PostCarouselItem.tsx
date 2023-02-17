import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';

type listProps = {
  item: {
    id: number;
    title: string;
    companyName: string;
    nickname: string;
    type: string;
    date: string;
  };
};

function PostCarouselItem({item}: listProps) {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  return (
    <Pressable
      style={styles.postBox}
      onPress={() => navigation.navigate('CommunityPost')}>
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
}
const styles = StyleSheet.create({
  postBox: {
    padding: 16,
    marginRight: 12,
    width: 208,
    backgroundColor: '#e8edff',
    borderRadius: 8,
  },
});

export default PostCarouselItem;
