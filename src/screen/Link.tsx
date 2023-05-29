import FloatingActionButton from '@/components/Common/FloatingActionButton';
import {iconPath} from '@/utils/iconPath';
import {fetchRecommendedInstructors} from '@api/instructor';
import InstructorListItem from '@components/InstructorListItem';
import LinkTop from '@components/LinkTop';
import Modal from '@components/ModalSheet';
import toast from '@hooks/toast';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {BLUE, WHITE} from '@styles/colors';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {LoggedInParamList} from '../../AppInner';

function Link() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const MODAL = [
    {
      value: '구인 공고 등록',
      selected: false,
      link: 'JobOfferForm',
      job: () => {
        setModalVisible(false);
        navigation.navigate('JobOfferForm');
      },
    },
    {
      value: '구직 공고 등록',
      selected: false,
      job: () => {
        setModalVisible(false);
        Alert.alert('text', '아직 준비중이에요!');
      },
    },
  ];

  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);

  const [instructors, setInstructors] = useState<any[]>([]);
  useEffect(() => {
    fetchRecommendedInstructors()
      .then(({data}) => {
        setInstructors(data);
      })
      .catch(error => {
        if (isAxiosError(error)) {
          toast.error({message: error.message});
        }
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      return navigation.addListener('beforeRemove', e => {
        e.preventDefault();
        Alert.alert('잠시만요!', '앱을 종료하시겠습니까?', [
          {
            text: '취소',
            onPress: () => null,
          },
          {text: '확인', onPress: () => BackHandler.exitApp()},
        ]);
      });
    }, [navigation]),
  );

  function renderItem({item}: any) {
    return <InstructorListItem item={item} />;
  }

  const openModal = () => {
    navigation.navigate('JobOfferForm');
    // setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={instructors}
        keyExtractor={item => 'recommendedInstructor' + item.seq}
        renderItem={renderItem}
        ListHeaderComponent={<LinkTop />}
        ItemSeparatorComponent={() => <View style={common.separator} />}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.fabContainer}>
        <FloatingActionButton
          iconSource={iconPath.PENCIL_W}
          onPress={openModal}
        />
      </View>
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'공고 등록하기'}
        content={
          <View>
            {MODAL.map((item, index) => {
              return (
                <View key={index} style={common.modalItemBox}>
                  <Pressable
                    onPress={item.job}
                    style={[common.rowCenterBetween, {width: '100%'}]}>
                    <Text
                      style={[
                        common.modalText,
                        item.selected && {color: BLUE.DEFAULT},
                      ]}>
                      {item.value}
                    </Text>
                    {item.selected && (
                      <Image source={iconPath.CHECK} style={common.size24} />
                    )}
                  </Pressable>
                </View>
              );
            })}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default Link;
