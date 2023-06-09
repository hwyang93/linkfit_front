import Avatar from '@/components/Common/Avatar';
import BottomSheet from '@/components/Common/BottomSheet';
import DotPagination from '@/components/Common/DotPagination';
import FilterChip from '@/components/Common/FilterChip';
import FilterChipContainer from '@/components/Common/FilterChipContainer';
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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
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
    <ScrollView
      showsVerticalScrollIndicator
      style={{flex: 1, backgroundColor: THEME.WHITE}}>
      <View
        style={{
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
    </ScrollView>
  );
};

const InstructorTab: React.FC = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator
      style={{flex: 1, backgroundColor: THEME.WHITE}}>
      <View
        style={{
          paddingHorizontal: 16,
        }}>
        <InstructorProfile style={common.mt16} />
        <Card style={common.mt16} />
        <Card style={common.mt8} />
        <Card style={common.mt8} />
      </View>
    </ScrollView>
  );
};

type Props = NativeStackScreenProps<LoggedInParamList, 'RecruitMap'>;

const RecruitMapScreen = ({navigation}: Props) => {
  const {modalVisible, openModal, closeModal} = useModal();
  const {position, getCurrentPosition} = useGeolocation();

  const onPressMarker = () => {
    openModal();
  };

  return (
    <SafeAreaView edges={['left', 'right']} style={{flex: 1}}>
      <FilterChipContainer>
        <FilterChip label="포지션" style={common.mr8} rightIcon />
        <FilterChip label="채용형태" style={common.mr8} rightIcon />
        <FilterChip label="수업시간" rightIcon />
      </FilterChipContainer>
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
      <BottomSheet visible={modalVisible} onDismiss={closeModal}>
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
      </BottomSheet>
    </SafeAreaView>
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
