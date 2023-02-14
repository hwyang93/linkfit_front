import {Dimensions, StyleSheet, View} from 'react-native';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import EmployerReviewComponent from '@components/My/EmployerReviewComponent';
import EmployeeReviewComponent from '@components/My/EmployeeReviewComponent';
import Modal from '@components/ModalSheet';
import {SetStateAction, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';

// todo : 케밥 버튼 클릭 시 모달 띄우기
// todo : 후기 등록 페이지 ReviewFormScreen.tsx

const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width;
const tabWidth = (windowWidth - 32) / 2;

const First = () => {
  return (
    <View style={styles.container}>
      <EmployeeReviewComponent />
    </View>
  );
};

function Second() {
  return (
    <View style={styles.container}>
      <EmployerReviewComponent />
    </View>
  );
}

function Tabs() {
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const DATA = [
    {
      value: '후기 수정하기',
      onPress: () => navigation.navigate('ReviewForm'),
    },
    {
      value: '후기 삭제하기',
      link: '',
    },
  ];
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 16, fontWeight: '700'},
          tabBarActiveTintColor: BLUE.DEFAULT,
          tabBarInactiveTintColor: GRAY.DEFAULT,
          tabBarItemStyle: {width: tabWidth},
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
        <Tab.Screen name="구직" component={First} />
        <Tab.Screen name="구인" component={Second} />
      </Tab.Navigator>
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'더보기'}
        modalData={DATA}
      />
    </>
  );
}

export default function () {
  return <Tabs />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: WHITE,
    height: '100%',
  },
});
