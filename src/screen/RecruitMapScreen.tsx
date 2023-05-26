import Avatar from '@/components/Common/Avatar';
import BottomSheet from '@/components/Common/BottomSheet';
import Chip from '@/components/Common/Chip';
import DotPagination from '@/components/Common/DotPagination';
import FloatingActionButton from '@/components/Common/FloatingActionButton';
import Icon from '@/components/Common/Icon';
import IconButton from '@/components/Common/IconButton';
import LoadingFallback from '@/components/Common/LoadingFallback';
import useGeolocation from '@/hooks/useGeolocation';
import useModal from '@/hooks/useModal';
import common from '@/styles/common';
import THEME from '@/styles/theme';
import SRC from '@/utils/constants/assets';
import {SCREEN_WIDTH} from '@/utils/constants/common';
import {iconPath} from '@/utils/iconPath';
import {materialTopTabNavigationOptions} from '@/utils/options/tab';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoggedInParamList} from '../../AppInner';

// TODO: 텍스트 스타일이 기존에 정의되어있는 스타일셋을 사용하도록 변경

const DUMMY_MARKERS = [
  {
    type: 'yoga',
    icon: require('@images/icon/marker_yoga.png'),
    latitude: 37.503079,
    longitude: 127.03428053825826,
  },
  {
    type: 'pilates',
    icon: require('@images/icon/marker_pilates.png'),
    latitude: 37.50079,
    longitude: 127.035,
  },
  {
    type: 'pilates',
    icon: require('@images/icon/marker_pilates.png'),
    latitude: 37.50579,
    longitude: 127.035,
  },
  {
    type: 'test',
    icon: require('@images/icon/marker_pilates.png'),
    latitude: 37.785834,
    longitude: -122.406417,
  },
];

// async function requestPermission() {
//   try {
//     // IOS 위치 정보 수집 권한 요청
//     if (Platform.OS === 'ios') {
//       return await Geolocation.requestAuthorization('always');
//     }
//     // 안드로이드 위치 정보 수집 권한 요청
//     if (Platform.OS === 'android') {
//       return await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       );
//     }
//   } catch (e: any) {
//     toast.error({message: e.message});
//   }
// }

// TODO: 컴포넌트 props 정의하고 파일 분리하기
interface CardProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
}

const Card: React.FC<CardProps> = ({style}) => {
  return (
    <View
      style={[
        {
          width: '100%',
          borderWidth: 1,
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          borderColor: THEME.GREY03,
        },
        style,
      ]}>
      <View>
        <Text style={{fontSize: 20, fontWeight: '700', color: THEME.BLACK}}>
          {'필라테스 강사님 모십니다.'}
        </Text>
        <Text style={{fontSize: 14, color: THEME.GREY02, marginTop: 12}}>
          {'파트 월,수,금 시간협의'}
        </Text>
      </View>
      <IconButton source={iconPath.BOOKMARK_ON} size={24} />
    </View>
  );
};

// TODO: 컴포넌트 props 정의하고 파일 분리하기

interface InstructorProfileProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
}

const InstructorProfile: React.FC<InstructorProfileProps> = ({style}) => {
  return (
    <View style={[{alignItems: 'center'}, style]}>
      <View style={[common.mt16, {flexDirection: 'row'}]}>
        <Avatar
          source={SRC.IMAGES.INSTRUCTOR01}
          size={64}
          style={common.mr16}
        />
        {<View />}
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  common.mr8,
                  {
                    fontSize: 20,
                    fontWeight: '700',
                    color: THEME.BLACK,
                  },
                ]}>
                {'닉네임'}
              </Text>
              <Text
                style={{fontSize: 14, fontWeight: '400', color: THEME.PRIMARY}}>
                {'인증 강사'}
              </Text>
              {/* TODO: CHECK_CIRCLE 아이콘 추가하고 적용하기 */}
              <Icon source={iconPath.CHECKED_BOX} size={16} />
            </View>
            <IconButton source={iconPath.LIST} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  marginTop: 6,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    marginRight: 4,
                    color: THEME.BLACK,
                  }}>
                  {'필라테스'}
                </Text>
                <Text style={{fontSize: 12, color: THEME.GREY02}}>{'3년'}</Text>
              </View>
              <Text style={{fontSize: 14, color: THEME.GREY02, marginTop: 4}}>
                {'서울 송파구'}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <IconButton source={iconPath.PHONE} style={common.mr8} />
              <IconButton source={iconPath.MESSAGE} style={common.mr8} />
              <IconButton source={iconPath.FAVORITE} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const Tab = createMaterialTopTabNavigator();

const CenterTab: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: THEME.WHITE,
        alignItems: 'center',
        paddingHorizontal: 16,
      }}>
      <Image
        style={[common.mt16, {width: '100%', height: 160, borderRadius: 8}]}
        source={SRC.IMAGES.CENTER01}
      />
      <View
        style={[
          common.mt16,
          {
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          },
        ]}>
        <View>
          <Text style={{fontSize: 20, fontWeight: '700', color: THEME.BLACK}}>
            {'링크 필라테스'}
          </Text>
          <Text
            style={[
              common.mt8,
              {
                fontSize: 14,
                fontWeight: '400',
                color: THEME.GREY02,
              },
            ]}>
            {'필라테스 | 서울 송파구'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <IconButton source={iconPath.PHONE} style={common.mr12} />
          <IconButton source={iconPath.MESSAGE} style={common.mr12} />
          <IconButton source={iconPath.FAVORITE} />
        </View>
      </View>
      <Card style={common.mt16} />
      <Card style={common.mt8} />
    </View>
  );
};

const InstructorTab: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: THEME.WHITE,
        paddingHorizontal: 16,
      }}>
      <InstructorProfile style={common.mt16} />
      <Card style={common.mt16} />
      <Card style={common.mt8} />
      <Card style={common.mt8} />
    </View>
  );
};

const RecruitMapScreen: React.FC<LoggedInParamList> = () => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  // const [modalVisible, setModalVisible] = useState(false);
  // const [modalVisible2, setModalVisible2] = useState(false);
  // const [modalTitle, setModalTitle] = useState('');
  // const [modalData, setModalData] = useState<any[]>([]);
  // const [selectedFilter, setSelectedFilter] = useState('');

  const {modalVisible, openModal, closeModal} = useModal();

  const {position, getCurrentPosition} = useGeolocation();

  const onPressMarker = () => {
    openModal();
  };

  // const [FILTER, setFILTER] = useState([
  //   {
  //     key: 'position',
  //     value: '포지션',
  //     job: () => {
  //       setSelectedFilter('position');
  //       setModalTitle('포지션');
  //       setModalData(MODAL);
  //       openModal();
  //     },
  //   },
  //   {
  //     key: 'type',
  //     value: '채용형태',
  //     job: () => {
  //       setSelectedFilter('type');
  //       setModalTitle('채용형태');
  //       setModalData(MODAL2);
  //       openModal();
  //     },
  //   },
  //   {
  //     key: 'time',
  //     value: '수업시간',
  //     job: () => {
  //       setSelectedFilter('time');
  //       setModalTitle('수업시간');
  //       setModalData(MODAL3);
  //       openModal();
  //     },
  //   },
  // ]);
  // const [MODAL, setMODAL] = useState([
  //   {
  //     icon: iconPath.LINK,
  //     iconOn: iconPath.LINK_ON,
  //     value: '전체',
  //     selected: false,
  //   },
  //   {
  //     icon: iconPath.PILATES,
  //     iconOn: iconPath.PILATES_ON,
  //     value: '필라테스',
  //     selected: false,
  //   },
  //   {
  //     icon: iconPath.YOGA,
  //     iconOn: iconPath.YOGA_ON,
  //     value: '요가',
  //     selected: false,
  //   },
  // ]);
  // const [MODAL2, setMODAL2] = useState([
  //   {
  //     value: '전임',
  //     selected: false,
  //   },
  //   {
  //     value: '파트타임',
  //     selected: false,
  //   },
  //   {
  //     value: '대강',
  //     selected: false,
  //   },
  //   {
  //     value: '실장',
  //     selected: false,
  //   },
  // ]);
  // const [MODAL3, setMODAL3] = useState([
  //   {
  //     value: '오전',
  //     selected: false,
  //   },
  //   {
  //     value: '오후',
  //     selected: false,
  //   },
  //   {
  //     value: '전일',
  //     selected: false,
  //   },
  //   {
  //     value: '협의',
  //     selected: false,
  //   },
  // ]);

  // const openModal2 = () => {
  //   setModalVisible2(true);
  // };

  // const onSelectFilter = useCallback(
  //   (selectItem: any) => {
  //     if (selectedFilter === 'position') {
  //       setMODAL(() => {
  //         return MODAL.map(item => {
  //           if (item.value === selectItem.value) {
  //             item.selected = !item.selected;
  //           } else {
  //             item.selected = false;
  //           }
  //           return item;
  //         });
  //       });
  //       setFILTER(() => {
  //         return FILTER.map(filter => {
  //           if (filter.key === 'position') {
  //             const value = modalData.find((item: any) => {
  //               return item.selected;
  //             })?.value;
  //             filter.value = value ? value : '포지션';
  //           }
  //           return filter;
  //         });
  //       });
  //     } else if (selectedFilter === 'type') {
  //       setMODAL2(() => {
  //         return MODAL2.map(item => {
  //           if (item.value === selectItem.value) {
  //             item.selected = !item.selected;
  //           } else {
  //             item.selected = false;
  //           }
  //           return item;
  //         });
  //       });
  //       setFILTER(() => {
  //         return FILTER.map(filter => {
  //           if (filter.key === 'type') {
  //             const value = modalData.find((item: any) => {
  //               return item.selected;
  //             })?.value;
  //             filter.value = value ? value : '채용 형태';
  //           }
  //           return filter;
  //         });
  //       });
  //     } else if (selectedFilter === 'time') {
  //       setMODAL3(() => {
  //         return MODAL3.map(item => {
  //           if (item.value === selectItem.value) {
  //             item.selected = !item.selected;
  //           } else {
  //             item.selected = false;
  //           }
  //           return item;
  //         });
  //       });
  //       setFILTER(() => {
  //         return FILTER.map(filter => {
  //           if (filter.key === 'time') {
  //             const value = modalData.find((item: any) => {
  //               return item.selected;
  //             })?.value;
  //             filter.value = value ? value : '수업 시간';
  //           }
  //           return filter;
  //         });
  //       });
  //     }
  //     setModalVisible(false);
  //   },
  //   [FILTER, MODAL, MODAL2, MODAL3, modalData, selectedFilter],
  // );

  return (
    <SafeAreaView edges={['left', 'right']} style={{flex: 1}}>
      <View>
        <ScrollView
          horizontal
          style={{paddingHorizontal: 16, paddingVertical: 8}}>
          <Chip
            label="포지션"
            style={common.mr8}
            rightIcon={
              <Image
                style={{width: 10, height: 6}}
                source={iconPath.MORE_ARROW_DOWN}
              />
            }
          />
          <Chip
            label="채용형태"
            style={common.mr8}
            rightIcon={
              <Image
                style={{width: 10, height: 6}}
                source={iconPath.MORE_ARROW_DOWN}
              />
            }
          />
          <Chip
            label="수업시간"
            rightIcon={
              <Image
                style={{width: 10, height: 6}}
                source={iconPath.MORE_ARROW_DOWN}
              />
            }
          />
        </ScrollView>
      </View>
      {position ? (
        <MapView
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          loadingEnabled
          initialRegion={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0043,
          }}>
          {DUMMY_MARKERS.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              onPress={onPressMarker}>
              <Icon source={marker.icon} size={24} />
            </Marker>
          ))}
        </MapView>
      ) : (
        <SafeAreaView edges={['bottom']} style={{flex: 1}}>
          <LoadingFallback />
        </SafeAreaView>
      )}
      <View style={styles.fabContainer}>
        <FloatingActionButton
          style={common.mt16}
          iconSource={iconPath.PENCIL_W}
          onPress={() => navigation.navigate('JobOfferForm')}
        />
        <FloatingActionButton
          style={common.mt16}
          iconSource={iconPath.LOCATION}
          variant="secondary"
          onPress={getCurrentPosition}
        />
        {/* TODO: MORE_VERT 아이콘 추가하고 적용하기 */}
        <FloatingActionButton
          style={common.mt16}
          iconSource={iconPath.LIST}
          variant="secondary"
          label="목록보기"
          onPress={() => navigation.navigate('RecruitList')}
        />
      </View>
      <BottomSheet
        visible={modalVisible}
        onDismiss={closeModal}
        content={
          <View style={{alignItems: 'center'}}>
            {/* TODO: width와 height를 지정하지 않으면 UI가 깨지는 버그 수정 */}
            <View style={{width: SCREEN_WIDTH, height: 550}}>
              <Tab.Navigator screenOptions={materialTopTabNavigationOptions}>
                <Tab.Screen name="센터" component={CenterTab} />
                <Tab.Screen name="강사" component={InstructorTab} />
              </Tab.Navigator>
            </View>
            <DotPagination currentPage={1} totalPages={2} />
          </View>
        }
      />
    </SafeAreaView>
    // <SafeAreaView edges={['left', 'right']} style={styles.container}>
    //   <View style={{paddingHorizontal: 16}}>
    //     {/* 필터 영역 */}
    //     <TopFilter data={FILTER} />
    //     {/* 필터 영역 */}
    //   </View>
    //   {position ? (
    //     <MapView
    //       style={{flex: 1}}
    //       provider={PROVIDER_GOOGLE}
    //       showsUserLocation={true}
    //       loadingEnabled={true}
    //       // showsMyLocationButton={true}
    //       initialRegion={{
    //         latitude: position.latitude,
    //         longitude: position.longitude,
    //         latitudeDelta: 0.0043,
    //         longitudeDelta: 0.0043,
    //       }}>
    //       {MARKER.map((item, index) => {
    //         return (
    //           <Marker
    //             key={index}
    //             coordinate={{
    //               latitude: item.latitude,
    //               longitude: item.longitude,
    //             }}
    //             onPress={openModal2}>
    //             <Image source={item.icon} style={{width: 24, height: 24}} />
    //           </Marker>
    //         );
    //       })}
    //     </MapView>
    //   ) : (
    //     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //       <ActivityIndicator color={BLUE.DEFAULT} />
    //     </View>
    //   )}

    //   {/* Floating Button */}
    //   <FloatingWriteButton
    //     bottom={144}
    //     icon={iconPath.PENCIL_W}
    //     job={toJobOfferForm}
    //   />
    //   {/* 현재 위치로 이동 버튼 */}
    //   <LocationButton bottom={88} job={getCurrentPosition} />
    //   {/* 페이지 이동 버튼 */}
    //   <FloatingLinkButton
    //     link={'RecruitList'}
    //     title={'목록보기'}
    //     icon={iconPath.LIST}
    //   />
    //   <Modal
    //     modalVisible={modalVisible}
    //     setModalVisible={setModalVisible}
    //     title={modalTitle}
    //     modalData={modalData}
    //     content={
    //       <View>
    //         {modalData.map((item, index) => {
    //           return (
    //             <View key={index} style={common.modalItemBox}>
    //               <Pressable
    //                 key={index}
    //                 onPress={() => onSelectFilter(item)}
    //                 style={[common.rowBetween, {width: '100%'}]}>
    //                 <View style={[common.rowCenter]}>
    //                   {item.icon ? (
    //                     <Image
    //                       style={[common.size24, common.mr10]}
    //                       source={item.selected ? item.iconOn : item.icon}
    //                     />
    //                   ) : null}
    //                   <Text
    //                     style={[
    //                       common.modalText,
    //                       item.selected && {color: BLUE.DEFAULT},
    //                     ]}>
    //                     {item.value}
    //                   </Text>
    //                 </View>
    //                 {item.selected ? (
    //                   <Image style={common.size24} source={iconPath.CHECK} />
    //                 ) : null}
    //               </Pressable>
    //             </View>
    //           );
    //         })}
    //         {/* button */}
    //         <View>
    //           <Pressable style={{width: '100%', marginTop: 40}}>
    //             <LinearGradient
    //               style={common.button}
    //               start={{x: 0.1, y: 0.5}}
    //               end={{x: 0.6, y: 1}}
    //               colors={['#74ebe4', '#3962f3']}>
    //               <Text style={common.buttonText}>필터 적용</Text>
    //             </LinearGradient>
    //           </Pressable>
    //         </View>
    //       </View>
    //     }
    //   />
    //   <Modal
    //     modalVisible={modalVisible2}
    //     setModalVisible={setModalVisible2}
    //     title={'센터'}
    //     type={'tab'}
    //     content={
    //       <View style={{width: '100%'}}>
    //         <View style={common.mb16}>
    //           <CenterInfoComponent />
    //         </View>
    //         <View>
    //           <View style={common.basicBox}>
    //             <Text>필라테스</Text>
    //           </View>
    //         </View>
    //       </View>
    //     }
    //   />
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 32,
    alignItems: 'flex-end',
  },
});

export default RecruitMapScreen;
