import {RecruitApplyEntity, RecruitEntity} from '@/types/api/entities';
import {RecruitStatus} from '@/types/api/recruit';
import {iconPath} from '@/utils/iconPath';
import {materialTopTabNavigationOptions} from '@/utils/options/tab';
import {fetchRecruitApplications} from '@api/recruit';
import Modal from '@components/ModalSheet';
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

type TabProps = {
  waitingApplications?: RecruitApplyEntity[];
  finishApplications?: RecruitApplyEntity[];
  initList: object;
};

const ApplicantStatusScreen = ({route}: Props) => {
  const isFocused = useIsFocused();
  const [recruitInfo, setRecruitInfo] = useState<RecruitEntity>();
  const [waitingApplications, setWaitingApplications] =
    useState<RecruitApplyEntity[]>();
  const [finishApplications, setFinishApplications] =
    useState<RecruitApplyEntity[]>();
  const [modalVisible, setModalVisible] = useState(false);

  const getRecruitApplications = useCallback(() => {
    fetchRecruitApplications(route.params.recruitSeq)
      .then(({data}) => {
        const waitingList = data.recruitApply.filter(item => {
          return item.status === RecruitStatus.Applied;
        });

        const finishList = data.recruitApply.filter(item => {
          return item.status !== RecruitStatus.Applied;
        });
        setRecruitInfo(data.recruit);
        setWaitingApplications(waitingList);
        setFinishApplications(finishList);
      })
      .catch(error => {
        if (isAxiosError(error)) {
          toast.error({message: error.message});
        }
      });
  }, [route.params.recruitSeq]);

  useEffect(() => {
    if (isFocused) {
      getRecruitApplications();
    }
  }, [isFocused, route.params.recruitSeq, getRecruitApplications]);

  const MODAL = [
    {
      value: '공고 수정하기',
      job: () => {},
    },
    {
      value: '공고 복사하기',
      job: () => {},
    },
  ];

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
              onPress={() => setModalVisible(true)}>
              <Image source={iconPath.KEBAB} style={[common.size24]} />
            </Pressable>
          </View>
        </View>
        <Modal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={'타이틀'}
          content={
            <View>
              {MODAL.map((item, index) => (
                <View key={index} style={common.modalItemBox}>
                  <Pressable style={[common.rowCenterBetween, {width: '100%'}]}>
                    <Text style={[common.modalText]}>{item.value}</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          }
        />
      </View>
      <Tabs
        waitingApplications={waitingApplications}
        finishApplications={finishApplications}
        initList={getRecruitApplications}
      />
    </>
  );
};

export const Tabs = ({
  waitingApplications,
  finishApplications,
  initList,
}: TabProps) => {
  return (
    <Tab.Navigator screenOptions={materialTopTabNavigationOptions}>
      <Tab.Screen
        name="대기중"
        children={() => (
          <ApplicantWaitingComponent
            list={waitingApplications}
            initList={initList}
          />
        )}
      />
      <Tab.Screen
        name="완료"
        children={() => (
          <ApplicantFinishComponent
            list={finishApplications}
            initList={initList}
          />
        )}
      />
    </Tab.Navigator>
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
