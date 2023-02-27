import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BLUE, GRAY, WHITE} from '@styles/colors';

import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ApplicantWaitingComponent from '@components/My/ApplicantWaitingComponent';
import ApplicantFinishComponent from '@components/My/ApplicantFinishComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList, RootStackParamList} from '../../../AppInner';
import {useEffect, useState} from 'react';
import {fetchRecruitApplications} from '@api/recruit';

const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width;
const tabWidth = (windowWidth - 32) / 2;
type props = NativeStackScreenProps<LoggedInParamList, 'ApplicantStatus'>;
function ApplicantStatusScreen({route}: props) {
  const [recruitInfo, setRecruitInfo] = useState<any>({});
  const [waitingApplications, setWaitingApplications] = useState<any[]>([]);
  const [finishApplications, setFinishApplications] = useState<any[]>([]);

  useEffect(() => {
    fetchRecruitApplications(route.params.recruitSeq)
      .then(({data}: any) => {
        setRecruitInfo(data?.recruit);
        console.log(data);
      })
      .catch((e: any) => {
        Alert.alert(e.message);
      });
  }, []);

  return (
    <>
      <View style={styles.container}>
        {/* 컨텐츠 영역 */}
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
              onPress={() => Alert.alert('text', '케밥 클릭')}>
              <Image source={iconPath.KEBAB} style={[common.size24]} />
            </Pressable>
          </View>
        </View>
        {/* 컨텐츠 영역 */}
      </View>
      <Tabs />
    </>
  );
}

export function Tabs() {
  return (
    <>
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
        <Tab.Screen name="대기중" component={ApplicantWaitingComponent} />
        <Tab.Screen name="완료" component={ApplicantFinishComponent} />
      </Tab.Navigator>
    </>
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
