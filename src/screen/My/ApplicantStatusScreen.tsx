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

const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width;
const tabWidth = (windowWidth - 32) / 2;

function ApplicantStatusScreen() {
  return (
    <>
      <View style={styles.container}>
        {/* 컨텐츠 영역 */}
        <View>
          <View style={[common.basicBox, common.mv8]}>
            <View style={common.rowCenter}>
              <Text style={[common.text_s, common.fcg]}>2022.12.09 작성</Text>
              <Text style={[common.mh8, common.fcg]}>|</Text>
              <Text style={[common.text_s, common.fcg]}>진행 중</Text>
            </View>
            <Text style={[common.title, common.mv12]} numberOfLines={1}>
              공고 제목
            </Text>
            <Text style={[common.text_m, common.fwb]}>필라테스</Text>
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
