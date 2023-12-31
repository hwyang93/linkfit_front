import { useDeleteReview } from '@/hooks/review/use-delete-review';
import { useReviewList } from '@/hooks/review/use-review-list';
import { useAppNavigation } from '@/hooks/use-app-navigation';
import useModal from '@/hooks/use-modal';
import { MEMBER_TYPE } from '@/lib/constants/enum';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { formatDate } from '@/lib/util';
import toast from '@hooks/toast';
import { BLUE, GRAY, WHITE } from '@styles/colors';
import common from '@styles/common';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AppScrollView from '../\bLayout/AppScrollView';
import BottomSheet from '../Common/BottomSheet';
import BottomSheetOption from '../Common/BottomSheetOption';
import EmptySet from '../EmptySet';

const EmployeeReviewTab: React.FC = () => {
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);

  const navigation = useAppNavigation();

  const reviewListQuery = useReviewList();
  const reviewList = reviewListQuery.data;

  const deleteReviewMutation = useDeleteReview();

  const modal = useModal();

  const deleteReview = () => {
    if (!selectedReviewId) return;

    deleteReviewMutation.mutate(selectedReviewId, {
      onSuccess: () => {
        toast.success({ message: '후기 삭제가 완료되었어요!' });
        modal.close();
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          toast.error({ message: error.message });
        }
      },
    });
  };

  const onEditPress = () => {
    if (!selectedReviewId) return;

    modal.close();
    navigation.navigate(ROUTE.MY.REVIEW_EDIT, { reviewId: selectedReviewId });
  };

  const onDeletePress = () => {
    deleteReview();
  };

  return (
    <AppScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {reviewList?.length === 0 && <EmptySet text="작성한 후기가 없어요" />}
      {reviewList?.map((item) =>
        item.targetMember.type === MEMBER_TYPE.INSTRUCTOR ? (
          <View key={'review_' + item.seq} style={styles.reviewBox}>
            <View style={common.rowCenter}>
              <Image
                source={
                  item.targetMember.profileImage
                    ? { uri: item.targetMember.profileImage.originFileUrl }
                    : require('../../assets/images/thumbnail.png')
                }
                style={styles.thumbnail}
              />
              <View>
                <View style={common.rowCenter}>
                  <Text style={[common.text_m, common.fwb, common.mr8]}>
                    {item.targetMember.nickname
                      ? item.targetMember.nickname
                      : item.targetMember.name}
                  </Text>
                  <Text style={[common.text_s, { color: BLUE.DEFAULT }]}>인증강사</Text>
                  <Image
                    style={{ marginLeft: 2, width: 14, height: 14 }}
                    source={iconPath.CERTIFICATION}
                  />
                </View>
                <View style={common.row}>
                  <Text style={[common.text_s, common.fwb, common.mr8]}>
                    {item.targetMember.field}
                  </Text>
                  {/*<Text style={[common.text]}>3년</Text>*/}
                </View>
              </View>
            </View>
            <Text style={[common.mt8, common.text]}>{formatDate(item.updatedAt)}</Text>
            <Text style={common.text_m}>{item.comment}</Text>
            <Pressable
              style={styles.kebabIcon}
              hitSlop={10}
              onPress={() => {
                setSelectedReviewId(item.seq);
                modal.open();
              }}>
              <Image source={iconPath.KEBAB} style={common.size24} />
            </Pressable>
          </View>
        ) : (
          <View key={'review_' + item.seq} style={styles.reviewBox}>
            <View style={common.rowCenter}>
              <Text style={[common.text_m, common.fwb, common.mr8]}>
                {item.targetMember.company?.companyName}
              </Text>
              <Text style={common.text}>{item.targetMember.company?.field}</Text>
            </View>
            <Text style={[common.mt8, common.text]}>{formatDate(item.updatedAt)}</Text>
            <Text style={common.text_m}>{item.comment}</Text>
            <Pressable
              style={styles.kebabIcon}
              hitSlop={10}
              onPress={() => {
                setSelectedReviewId(item.seq);
                modal.open();
              }}>
              <Image source={iconPath.KEBAB} style={common.size24} />
            </Pressable>
          </View>
        ),
      )}
      <BottomSheet visible={modal.visible} onDismiss={modal.close} title="더보기">
        <BottomSheetOption label="후기 수정하기" onPress={onEditPress} />
        <BottomSheetOption label="후기 삭제하기" onPress={onDeletePress} />
      </BottomSheet>
    </AppScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: WHITE, flex: 1, padding: 16 },
  kebabIcon: { position: 'absolute', right: 0, top: 16 },
  reviewBox: {
    borderBottomWidth: 1,
    borderColor: GRAY.DEFAULT,
    paddingVertical: 16,
  },
  thumbnail: { height: 48, marginRight: 12, width: 48 },
});

export default EmployeeReviewTab;
