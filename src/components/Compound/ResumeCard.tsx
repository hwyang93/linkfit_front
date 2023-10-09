import { useDeleteResume } from '@/hooks/resume/use-delete.resume';
import { useUpdateResumeMaster } from '@/hooks/resume/use-update-resume-master';
import toast from '@/hooks/toast';
import { useAppNavigation } from '@/hooks/use-app-navigation';
import useModal from '@/hooks/use-modal';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import common from '@/styles/common';
import THEME from '@/styles/theme';
import { isAxiosError } from 'axios';
import React from 'react';
import { Alert, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import BottomSheet from '../Common/BottomSheet';
import BottomSheetOption from '../Common/BottomSheetOption';
import Card from '../Common/Card';
import Chip from '../Common/Chip';
import IconButton from '../Common/IconButton';

interface ResumeCardProps {
  style?: StyleProp<ViewStyle>;
  resumeId: number;
  isMaster: boolean;
  title: string;
  timestamp: string;
  kebabIconShown?: boolean;
  onPress?: () => void;
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  style,
  resumeId,
  title,
  timestamp,
  kebabIconShown,
  isMaster = false,
  onPress,
}) => {
  const modal = useModal();

  const navigation = useAppNavigation();

  const updateResumeMasterMutation = useUpdateResumeMaster();
  const deleteResumeMutation = useDeleteResume();

  const onUpdateResumeMaster = () => {
    updateResumeMasterMutation.mutate(resumeId, {
      onSuccess: () => {
        modal.close();
        toast.success({ message: '대표이력서 설정이 완료되었어요!' });
      },
      onError: (error) => isAxiosError(error) && toast.error({ message: error.message }),
    });
  };

  const onDeleteResume = () => {
    deleteResumeMutation.mutate(resumeId, {
      onSuccess: () => {
        modal.close();
        toast.success({ message: '이력서가 삭제되었습니다.' });
      },
      onError: (error) => isAxiosError(error) && toast.error({ message: error.message }),
    });
  };

  const onDeletePress = () => {
    modal.close();
    Alert.alert('', '삭제하시겠습니까?', [
      {
        text: '취소',
      },
      {
        text: '삭제',
        onPress: () => onDeleteResume(),
        style: 'cancel',
      },
    ]);
  };

  return (
    <Card style={style} onPress={onPress}>
      {isMaster && <Chip label="대표" />}
      <Text style={common.title}>{title}</Text>
      <Text style={[common.text_s, { color: THEME.GREY02 }]}>{timestamp}</Text>
      {kebabIconShown && (
        <IconButton source={iconPath.KEBAB} style={styles.kebabIcon} onPress={modal.open} />
      )}
      <BottomSheet visible={modal.visible} onDismiss={modal.close}>
        <BottomSheetOption label="대표 이력서로 설정" onPress={onUpdateResumeMaster} />
        <BottomSheetOption
          label="미리보기"
          onPress={() => {
            modal.close();
            navigation.navigate(ROUTE.RESUME.PREVIEW, {
              resumeSeq: resumeId,
            });
          }}
        />
        <BottomSheetOption
          label="수정"
          onPress={() => {
            modal.close();
            navigation.navigate(ROUTE.MY.RESUME_EDIT, {
              resumeId: resumeId,
            });
          }}
        />
        <BottomSheetOption label="삭제" onPress={onDeletePress} />
      </BottomSheet>
    </Card>
  );
};

const styles = StyleSheet.create({
  kebabIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
});

export default ResumeCard;
