import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import InstructorInfoComponent from '@components/InstructorInfoComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import Modal from '@components/ModalSheet';
import {SetStateAction, useState} from 'react';

function SendSuggestionDetailScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [modalVisible, setModalVisible] =
    useState<SetStateAction<boolean>>(false);

  const MODAL = [
    {
      value: '차단하기',
      job: () => {},
    },
    {
      value: '신고하기',
      job: () => {},
    },
  ];

  const toOffer = () => {
    // navigation.navigate('JobPost');
  };

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={[common.title_l, common.mt16, common.mb16]}>
            필라테스 전임 강사 제안
          </Text>
          <View style={[common.rowCenter, common.mb16]}>
            <Text style={[common.text_s, common.fcg]}>필라테스</Text>
            <Text style={[common.text_s, common.fcg, common.mh8]}>|</Text>
            <Text style={[common.text_s, common.fcg]}>서울 · 송파구</Text>
          </View>
          <View style={[common.mb40]}>
            <Text style={[common.text_s, common.fcg, common.mb12]}>
              2022.10.09 제안
            </Text>
            <Text style={[common.text_s, common.fcg]}>2022.11.09 마감</Text>
          </View>

          {/* 제안 내용 */}
          <Text style={[common.text_m, common.fwb, common.mb8]}>제안 내용</Text>
          <Text style={[common.text_m, common.mb40]}>
            안녕하세요. 링크 필라테스 원장입니다. 저희가 찾고 있는 포지션에
            적합한 인재라고 생각되어 이렇게 제안드립니다. 긍정적인 검토
            부탁드리며, 관련 자세한 내용이 궁금하시다면 응답기간 내 회신
            부탁드립니다.
          </Text>

          {/* 제안한 채용 공고 영역 */}
          <View style={common.mb40}>
            <Text style={[common.text_m, common.fwb, common.mb8]}>
              제안한 채용 공고
            </Text>
            <View>
              <Pressable style={[common.basicBox]} onPress={toOffer}>
                <View style={common.rowCenter}>
                  <Text style={[common.text_s, common.fcg]}>
                    2022.12.09 작성
                  </Text>
                  <Text style={[common.text_s, common.fcg, common.mh8]}>|</Text>
                  <Text style={[common.text_s, common.fcg]}>진행 중</Text>
                </View>
                <Text style={[common.title, common.mv12]} numberOfLines={1}>
                  오래동안 함께 하실 필라테스 전임 강사님을 구합니다.
                </Text>
                <Text style={[common.text_m, common.fcg]}>필라테스</Text>
              </Pressable>
            </View>
          </View>

          {/* 강사 정보 */}
          <View style={common.mb24}>
            <Text style={[common.text_m, common.fwb, common.mb8]}>
              강사 정보
            </Text>
            <View>
              <InstructorInfoComponent from={'center'} job={openModal} />
            </View>
          </View>
        </View>
        <Modal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={'더보기'}
          modalData={MODAL}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
});

export default SendSuggestionDetailScreen;
