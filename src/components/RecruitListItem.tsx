import {SCREEN_WIDTH} from '@/utils/constants/common';
import {iconPath} from '@/utils/iconPath';
import {createRecruitBookmark, deleteRecruitBookmark} from '@api/recruit';
import toast from '@hooks/toast';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import common from '@styles/common';
import {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {LoggedInParamList} from '../../AppInner';

const columns2 = (SCREEN_WIDTH - 48) / 2;

interface RecruitListItemProps {
  item: any;
}

const RecruitListItem: React.FC<RecruitListItemProps> = ({item}) => {
  const [recruitInfo, setRecruitInfo] = useState(item);

  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

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
        .catch(error => {
          toast.error({message: error.message});
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
        .catch(error => {
          toast.error({message: error.message});
        });
    }
  }, [recruitInfo]);

  useEffect(() => {
    setRecruitInfo(item);
  }, [item]);

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
};

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
