import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BLUE, GRAY, WHITE} from '@styles/colors';

import common from '@styles/common';
import {iconPath} from '@/utils/iconPath';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ApplicantWaitingComponent from '@components/My/ApplicantWaitingComponent';
import ApplicantFinishComponent from '@components/My/ApplicantFinishComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../../AppInner';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import {fetchRecruitApplications} from '@api/recruit';
import {useIsFocused} from '@react-navigation/native';
import Modal from '@components/ModalSheet';
import toast from '@hooks/toast';

const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width;
const tabWidth = (windowWidth - 32) / 2;
type props = NativeStackScreenProps<LoggedInParamList, 'ApplicantStatus'>;

type tabProps = {
  waitingApplications: any[];
  finishApplications: any[];
  initList: object;
};

function ApplicantStatusScreen({route}: props) {
  const isFocused = useIsFocused();
  const [recruitInfo, setRecruitInfo] = useState<any>({});
  const [waitingApplications, setWaitingApplications] = useState<any[]>([]);
  const [finishApplications, setFinishApplications] = useState<any[]>([]);
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const getRecruitApplications = useCallback(() => {
    fetchRecruitApplications(route.params.recruitSeq)
      .then(({data}: any) => {
        const waitingList = data.recruitApply.filter((item: any) => {
          return item.status === 'APPLY';
        });

        const finishList = data.recruitApply.filter((item: any) => {
          return item.status !== 'APPLY';
        });
        setRecruitInfo(data.recruit);
        setWaitingApplications(waitingList);
        setFinishApplications(finishList);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, [route.params.recruitSeq]);

  useEffect(() => {
    if (isFocused) {
      getRecruitApplications();
    }
  }, [isFocused, route.params.recruitSeq]);

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
        {/* 컨텐츠 영역 */}
        <View>
          <View style={[common.basicBox, common.mv8]}>
            <View style={common.rowCenter}>
              <Text style={[common.text_s, common.fcg]}>
                {recruitInfo.createdAt} 작성
              </Text>
              <Text style={[common.mh8, common.fcg]}>|</Text>
              <Text style={[common.text_s, common.fcg]}>
                {recruitInfo.status === 'ING' ? '진행중' : '마감'}
              </Text>
            </View>
            <Text style={[common.title, common.mv12]} numberOfLines={1}>
              {recruitInfo.title}
            </Text>
            <Text style={[common.text_m, common.fwb]}>
              {recruitInfo.position}
            </Text>
            <Pressable
              style={styles.kebabIcon}
              hitSlop={10}
              onPress={() => setModalVisible(true)}>
              <Image source={iconPath.KEBAB} style={[common.size24]} />
            </Pressable>
          </View>
        </View>
        {/* 컨텐츠 영역 */}
        <Modal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={'타이틀'}
          content={
            <View>
              {MODAL.map((item, index) => {
                return (
                  <View key={index} style={common.modalItemBox}>
                    <Pressable
                      // onPress={() => onClickItem(item)}
                      style={[common.rowCenterBetween, {width: '100%'}]}>
                      <Text
                        style={[
                          common.modalText,
                          // item.selected && {color: BLUE.DEFAULT},
                        ]}>
                        {item.value}
                      </Text>
                      {/*{item.selected && (*/}
                      {/*  <Image source={iconPath.CHECK} style={common.size24} />*/}
                      {/*)}*/}
                    </Pressable>
                  </View>
                );
              })}
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
}

export function Tabs({
  waitingApplications,
  finishApplications,
  initList,
}: tabProps) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 16, fontWeight: '700'},
        tabBarActiveTintColor: BLUE.DEFAULT,
        tabBarInactiveTintColor: GRAY.DEFAULT,
        tabBarItemStyle: {
          width: tabWidth,
        },
        tabBarContentContainerStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarIndicatorStyle: {width: tabWidth, marginLeft: 16},
        tabBarStyle: {
          elevation: 0, // for Android
          shadowOffset: {
            width: 0,
            height: 0, // for iOS
          },
        },
      }}>
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
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  kebabIcon: {position: 'absolute', top: 16, right: 16},
});

export default ApplicantStatusScreen;
