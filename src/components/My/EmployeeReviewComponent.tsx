import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import common from '@styles/common';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import {iconPath} from '@/utils/iconPath';
import {SetStateAction, useCallback, useEffect, useState} from 'react';
import Modal from '@components/ModalSheet';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {deleteMemberReputation, fetchMemberReputations} from '@api/member';
import toast from '@hooks/toast';

function EmployeeReviewComponent() {
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);
  const [reputations, setReputations] = useState<any[]>([]);
  const [selectedReputation, setSelectedReputation] = useState({
    seq: 0,
  });
  const openModal = () => {
    setModalVisible(true);
  };

  const getReputations = useCallback(() => {
    fetchMemberReputations()
      .then(({data}: any) => {
        setReputations(data);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, []);

  useEffect(() => {
    if (isFocused) {
      getReputations();
    }
  }, [isFocused, getReputations]);

  const onDeleteReputation = useCallback(() => {
    deleteMemberReputation(selectedReputation.seq)
      .then(() => {
        toast.success({message: '후기 삭제가 완료되었어요!'});
        setModalVisible(false);
        getReputations();
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, [selectedReputation.seq, getReputations]);

  // props 로 모달에 보낼 값
  const DATA = [
    {
      value: '후기 수정하기',
      job: () => {
        setModalVisible(false);
        navigation.navigate('ReviewForm', {reputationInfo: selectedReputation});
      },
    },
    {
      value: '후기 삭제하기',
      job: () => {
        onDeleteReputation();
      },
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {reputations.map(item => {
        return item.targetMember.type === 'INSTRUCTOR' ? (
          <View key={'review_' + item.seq} style={styles.reviewBox}>
            <View style={common.rowCenter}>
              <Image
                source={
                  item.targetMember.profileImage
                    ? {uri: item.targetMember.profileImage.originFileUrl}
                    : require('../../assets/images/thumbnail.png')
                }
                style={styles.thumbnail}
              />
              <View>
                <View style={common.rowCenter}>
                  <Text style={[common.text_m, common.fwb, common.mr8]}>
                    {item.targetMember.nickname
                      ? item.targetMember.nickname
                      : item.targetMember.name}
                  </Text>
                  <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>
                    인증강사
                  </Text>
                  <Image
                    style={{marginLeft: 2, width: 14, height: 14}}
                    source={iconPath.CERTIFICATION}
                  />
                </View>
                <View style={common.row}>
                  <Text style={[common.text_s, common.fwb, common.mr8]}>
                    {item.targetMember.field}
                  </Text>
                  {/*<Text style={[common.text]}>3년</Text>*/}
                </View>
              </View>
            </View>
            <Text style={[common.mt8, common.text]}>{item.updatedAt}</Text>
            <Text style={common.text_m}>{item.comment}</Text>
            <Pressable
              style={styles.kebabIcon}
              hitSlop={10}
              onPress={() => {
                setSelectedReputation(item);
                openModal();
              }}>
              <Image source={iconPath.KEBAB} style={[common.size24]} />
            </Pressable>
          </View>
        ) : (
          <View key={'review_' + item.seq} style={styles.reviewBox}>
            <View style={common.rowCenter}>
              <Text style={[common.text_m, common.fwb, common.mr8]}>
                {item.targetMember.company.companyName}
              </Text>
              <Text style={common.text}>{item.targetMember.company.field}</Text>
            </View>
            <Text style={[common.mt8, common.text]}>{item.updatedAt}</Text>
            <Text style={common.text_m}>{item.comment}</Text>
            <Pressable
              style={styles.kebabIcon}
              hitSlop={10}
              onPress={() => {
                setSelectedReputation(item);
                openModal();
              }}>
              <Image source={iconPath.KEBAB} style={[common.size24]} />
            </Pressable>
          </View>
        );
      })}

      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'더보기'}
        modalData={DATA}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: WHITE},
  reviewBox: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: GRAY.DEFAULT,
  },
  thumbnail: {marginRight: 12, width: 48, height: 48},
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default EmployeeReviewComponent;
