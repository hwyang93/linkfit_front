import {Button, StyleSheet, View} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import {iconPath} from '@util/iconPath';
import Filter, {FilterTypes} from '@components/Filter';
import LocationButton from '@components/LocationButton';
import FloatingLinkButton from '@components/FloatingLinkButton';
import BottomSheet from '@components/BottomSheet';
import {useState} from 'react';

function RecruitMapScreen() {
  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const P1 = {latitude: 37.565051, longitude: 126.978567};

  const [modalVisible, setModalVisible] = useState(false);
  const pressButton = () => {
    setModalVisible(true);
  };

  const filter = [
    {
      title: '포지션',
      icon: true,
      list: [
        {
          value: '전체',
        },
        {
          value: '필라테스',
        },
        {
          value: '요가',
        },
      ],
    },
    {
      title: '채용형태',
      icon: false,
      list: [
        {
          value: '전임',
        },
        {
          value: '파트타임',
        },
        {
          value: '대강',
        },
        {
          value: '실장',
        },
      ],
    },
    {
      title: '수업시간',
      icon: false,
      list: [
        {
          value: '오전',
        },
        {
          value: '오후',
        },
        {
          value: '전일',
        },
        {
          value: '협의',
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        <Filter
          title="포지션"
          filterType={FilterTypes.POSITION}
          // filterSelect={() => setIsPressed(true)}
        />

        {/*<Filter filterType={FilterTypes.TIME} />*/}

        <Button title={'Open'} onPress={pressButton} />
        <BottomSheet
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
      <NaverMapView
        style={{width: '100%', height: '100%'}}
        showsMyLocationButton={false}
        zoomControl={false}
        center={{...P0, zoom: 16}}
        onTouch={(e: {nativeEvent: any}) =>
          console.warn('onTouch', JSON.stringify(e.nativeEvent))
        }
        onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
        onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
        <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
        <Marker
          coordinate={P1}
          pinColor="blue"
          onClick={() => console.warn('onClick! p1')}
        />
      </NaverMapView>
      {/* Todo : 플로팅 버튼 컴포넌트 */}
      {/* 현재 위치로 이동 버튼 */}
      <LocationButton />
      {/* 페이지 이동 버튼 */}
      <FloatingLinkButton
        link={'RecruitList'}
        title={'목록보기'}
        icon={iconPath.LIST}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filter: {flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 16},
});

export default RecruitMapScreen;
