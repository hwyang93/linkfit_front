import { useDeleteMemberReputation } from '@/hooks/member/use-delete-member-reputation';
import { useMemberReputationList } from '@/hooks/member/use-member-reputation-list';
import useModal from '@/hooks/use-modal';
import { Member } from '@/types/common';
import { iconPath } from '@/utils/iconPath';
import { formatDate } from '@/utils/util';
import toast from '@hooks/toast';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { BLUE, GRAY, WHITE } from '@styles/colors';
import common from '@styles/common';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AppScrollView from '../\bLayout/AppScrollView';
import { LoggedInParamList } from '../../../AppInner';
import BottomSheet from '../Common/BottomSheet';
import BottomSheetOption from '../Common/BottomSheetOption';
import EmptySet from '../EmptySet';

const EmployeeReviewTab: React.FC = () => {
  const [selectedReputationId, setSelectedReputationId] = useState<number | null>(null);

  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const memberReputationListQuery = useMemberReputationList();
  const reputations = memberReputationListQuery.data;

  const deleteMemberReputationMutation = useDeleteMemberReputation();

  const modal = useModal();

  const deleteReputation = () => {
    if (!selectedReputationId) return;

    deleteMemberReputationMutation.mutate(selectedReputationId, {
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
    modal.close();
    navigation.navigate('ReviewForm', {
      reputationInfo: selectedReputationId,
    });
  };

  const onDeletePress = () => {
    deleteReputation();
  };

  return (
    <AppScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {reputations?.length === 0 && <EmptySet text="작성한 후기가 없어요" />}
      {reputations?.map((item) =>
        item.targetMember.type === Member.Instructor ? (
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
                setSelectedReputationId(item.seq);
                modal.open();
              }}>
              <Image source={iconPath.KEBAB} style={[common.size24]} />
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
                setSelectedReputationId(item.seq);
                modal.open();
              }}>
              <Image source={iconPath.KEBAB} style={[common.size24]} />
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
  container: { flex: 1, padding: 16, backgroundColor: WHITE },
  reviewBox: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: GRAY.DEFAULT,
  },
  thumbnail: { marginRight: 12, width: 48, height: 48 },
  kebabIcon: { position: 'absolute', top: 16, right: 0 },
});

export default EmployeeReviewTab;
