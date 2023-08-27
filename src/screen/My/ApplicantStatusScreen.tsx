import BottomSheet from '@/components/Common/BottomSheet';
import BottomSheetOption from '@/components/Common/BottomSheetOption';
import useModal from '@/hooks/useModal';
import {
  FetchRecruitApplicationsResponse,
  RecruitStatus,
} from '@/types/api/recruit';
import {iconPath} from '@/utils/iconPath';
import {materialTopTabNavigationOptions} from '@/utils/options/tab';
import {fetchRecruitApplications} from '@api/recruit';
import ApplicantFinishComponent from '@components/My/ApplicantFinishComponent';
import ApplicantWaitingComponent from '@components/My/ApplicantWaitingComponent';
import toast from '@hooks/toast';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';

const Tab = createMaterialTopTabNavigator();

type Props = NativeStackScreenProps<LoggedInParamList, 'ApplicantStatus'>;

const ApplicantStatusScreen = ({route}: Props) => {
  const [recruitApplications, setRecruitApplications] =
    useState<FetchRecruitApplicationsResponse>();

  const isFocused = useIsFocused();

  const waitingApplications = recruitApplications?.recruitApply.filter(item => {
    return item.status === RecruitStatus.Applied;
  });

  const finishedApplications = recruitApplications?.recruitApply.filter(
    item => {
      return item.status !== RecruitStatus.Applied;
    },
  );

  const recruitInfo = recruitApplications?.recruit;

  const modal = useModal();

  const getRecruitApplications = useCallback(async () => {
    try {
      const response = await fetchRecruitApplications(route.params.recruitSeq);
      setRecruitApplications(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error({message: error.message});
      }
    }
  }, [route.params.recruitSeq]);

  useEffect(() => {
    if (isFocused) {
      getRecruitApplications();
    }
  }, [isFocused, getRecruitApplications]);

  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={[common.basicBox, common.mv8]}>
            <View style={common.rowCenter}>
              <Text style={[common.text_s, common.fcg]}>
                {recruitInfo?.createdAt} 작성
              </Text>
              <Text style={[common.mh8, common.fcg]}>|</Text>
              <Text style={[common.text_s, common.fcg]}>
                {recruitInfo?.status === 'ING' ? '진행중' : '마감'}
              </Text>
            </View>
            <Text style={[common.title, common.mv12]} numberOfLines={1}>
              {recruitInfo?.title}
            </Text>
            <Text style={[common.text_m, common.fwb]}>
              {recruitInfo?.position}
            </Text>
            <Pressable
              style={styles.kebabIcon}
              hitSlop={10}
              onPress={modal.open}>
              <Image source={iconPath.KEBAB} style={[common.size24]} />
            </Pressable>
          </View>
        </View>
        <BottomSheet
          visible={modal.visible}
          onDismiss={modal.close}
          title="타이틀">
          <BottomSheetOption label="공고 수정하기" />
          <BottomSheetOption label="공고 복사하기" />
        </BottomSheet>
      </View>
      {waitingApplications && finishedApplications && (
        <Tab.Navigator screenOptions={materialTopTabNavigationOptions}>
          <Tab.Screen
            name="대기중"
            children={() => (
              <ApplicantWaitingComponent list={waitingApplications} />
            )}
          />
          <Tab.Screen
            name="완료"
            children={() => (
              <ApplicantFinishComponent list={finishedApplications} />
            )}
          />
        </Tab.Navigator>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: WHITE,
  },
  kebabIcon: {position: 'absolute', top: 16, right: 16},
});

export default ApplicantStatusScreen;
