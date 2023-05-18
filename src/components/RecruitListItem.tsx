import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@/utils/iconPath';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';
import {useCallback, useEffect, useState} from 'react';
import {createCommunityBookmark, deleteCommunityBookmark} from '@api/community';
import toast from '@hooks/toast';
import {createRecruitBookmark, deleteRecruitBookmark} from '@api/recruit';

type ListProps = {
  // item: {
  //   seq: number;
  //   position: string;
  //   title: string;
  //   companyName: string;
  //   address: string;
  //   src: any;
  //   // color: string;
  //   writer: any;
  // };
  item: any;
};

const windowWidth = Dimensions.get('window').width;
const columns2 = (windowWidth - 48) / 2;

function RecruitListItem({item}: ListProps) {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [recruitInfo, setRecruitInfo] = useState(item);

  useEffect(() => {
    setRecruitInfo(item);
  }, [item]);

  const onClickBookmark = useCallback(() => {
    if (recruitInfo.isBookmark === 'N') {
      createRecruitBookmark(recruitInfo.seq)
        .then(() => {
          toast.success({message: '북마크 등록이 완료되었어요!'});
          setRecruitInfo({
            ...recruitInfo,
            isBookmark: 'Y',
          });
        })
        .catch((e: any) => {
          toast.error({message: e.message});
        });
    } else {
      deleteRecruitBookmark(recruitInfo.seq)
        .then(() => {
          toast.success({message: '북마크가 삭제되었어요!'});
          setRecruitInfo({
            ...recruitInfo,
            isBookmark: 'N',
          });
        })
        .catch((e: any) => {
          toast.error({message: e.message});
        });
    }
  }, [recruitInfo]);

  return (
    <Pressable
      style={styles.itemBox}
      onPress={() =>
        navigation.navigate('JobPost', {recruitSeq: recruitInfo.seq})
      }>
      <View style={styles.imgBox}>
        <Image
          style={styles.img}
          source={
            recruitInfo.writer.profileImage
              ? {uri: recruitInfo.writer.profileImage.originFileUrl}
              : iconPath.CENTER_DEFAULT
          }
        />
      </View>

      <View>
        {/* 포지션 */}
        <Text style={[common.text]}>{recruitInfo.position}</Text>
        {/* 제목 */}
        <Text style={[common.text_m, common.fwb]} numberOfLines={1}>
          {recruitInfo.title}
        </Text>
        {/* 업체명 */}
        <Text style={[common.text_s, common.fwb]}>
          {recruitInfo.companyName}
        </Text>
        {/* 지역 */}
        <Text style={common.text}>{recruitInfo.address}</Text>
        <Pressable style={styles.bookmark} onPress={() => onClickBookmark()}>
          <Image
            source={
              recruitInfo.isBookmark === 'Y'
                ? iconPath.BOOKMARK_ON
                : iconPath.BOOKMARK
            }
            style={[common.size24]}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemBox: {width: columns2, marginBottom: 16, marginHorizontal: 4},
  imgBox: {
    marginBottom: 8,
    height: 104,
    borderRadius: 8,
  },
  img: {width: '100%', height: 104, borderRadius: 8},
  bookmark: {position: 'absolute', top: 0, right: 13},
});

export default RecruitListItem;
