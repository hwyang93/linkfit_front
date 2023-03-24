import {
  Alert,
  BackHandler,
  FlatList,
  StyleSheet,
  View,
  Pressable,
  Text,
  Image,
} from 'react-native';
import {BLUE, WHITE} from '@styles/colors';
import common from '@styles/common';
import LinkTop from '@components/LinkTop';
import InstructorListItem from '@components/InstructorListItem';
import {iconPath} from '@util/iconPath';
import FloatingWriteButton from '@components/FloatingWriteButton';
import Modal from '@components/ModalSheet';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import {fetchInstructors} from '@api/instructor';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
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

  const [instructors, setInstructors] = useState(() => []);
  useEffect(() => {
    fetchInstructors()
      .then(({data}: any) => {
        setInstructors(data);
      })
      .catch((e: {message: () => any}) => {
        console.log(e.message());
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
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={instructors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={<LinkTop />}
        ItemSeparatorComponent={() => <View style={common.separator} />}
        showsVerticalScrollIndicator={false}
      />
      <FloatingWriteButton
        bottom={16}
        icon={iconPath.PENCIL_W}
        job={openModal}
      />
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
                    // onPress={() => onClickItem(item)}
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
    padding: 16,
    backgroundColor: WHITE,
  },
});

export default Link;
