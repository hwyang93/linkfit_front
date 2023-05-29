import {SCREEN_WIDTH} from '@/utils/constants/common';
import {iconPath} from '@/utils/iconPath';
import {createRecruitBookmark, deleteRecruitBookmark} from '@api/recruit';
import toast from '@hooks/toast';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import common from '@styles/common';
import {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {LoggedInParamList} from '../../AppInner';

const imageSize = (SCREEN_WIDTH - 40) / 2;

const RecruitListItem: React.FC<any> = ({item}) => {
  const [recruitInfo, setRecruitInfo] = useState<any>({});

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
    if (item.recruit) {
      setRecruitInfo(item.recruit);
    } else {
      setRecruitInfo(item);
    }
  }, [item]);

  return (
    <Pressable
      style={styles.slideBox}
      onPress={() =>
        navigation.navigate('JobPost', {recruitSeq: recruitInfo.seq})
      }>
      <View>
        <Image
          source={
            recruitInfo.writer?.profileImage
              ? {uri: recruitInfo.writer.profileImage.originFileUrl}
              : iconPath.CENTER_DEFAULT
          }
          style={styles.imgBox}
          resizeMode={'cover'}
        />
      </View>

      <View style={styles.infoBox}>
        {/* 포지션 */}
        <Text style={[common.text_m, common.fwb]}>{recruitInfo.position}</Text>
        {/* 업체명 */}
        <Text style={[common.text_s, common.fwb]}>{recruitInfo.title}</Text>
        <Text style={[common.text_s, common.fwb]}>
          {recruitInfo.companyName}
        </Text>
        {/* 지역 */}
        <Text style={[common.text_s, common.fcg]}>{recruitInfo.address}</Text>
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
  slideBox: {
    width: imageSize,
    marginRight: 8,
  },
  imgBox: {
    marginBottom: 8,
    width: imageSize,
    height: 104,
    borderRadius: 8,
  },
  infoBox: {position: 'relative'},
  bookmark: {position: 'absolute', top: 0, right: 0},
});

export default RecruitListItem;
