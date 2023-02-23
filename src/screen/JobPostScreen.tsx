import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CenterInfoComponent from '@components/CenterInfoComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoggedInParamList} from '../../AppInner';
import {useEffect, useState} from 'react';
import {fetchRecruit} from '@api/recruit';

type Props = NativeStackScreenProps<LoggedInParamList, 'JobPost'>;

function JobPostScreen({route}: Props) {
  const insets = useSafeAreaInsets();
  const {recruitSeq} = route.params;
  const [recruitInfo, setRecruitInfo] = useState<any>({});

  useEffect(() => {
    fetchRecruit(recruitSeq)
      .then(({data}: any) => {
        setRecruitInfo(data);
      })
      .catch((e: any) => {
        Alert.alert(e.message);
      });
  }, []);

  // todo: 지원을 안했으면 지원하기 버튼 표시 || 지원을 했으면 지원완료 메시지 표시
  return (
    <ScrollView
      style={[
        styles.container,
        {paddingTop: 16, paddingBottom: insets.bottom},
      ]}>
      {/* 구인공고 탑 메인 */}
      <View style={common.mb40}>
        <View style={common.mb16}>
          <Image
            source={require('../assets/images/job_01.png')}
            resizeMode={'cover'}
            style={styles.imgBox}
          />
        </View>
        <Text style={[common.mb16, common.title_l]}>{recruitInfo.title}</Text>
        <Text style={[common.mb16, common.text_s, {color: GRAY.DARK}]}>
          {recruitInfo.companyName} | 서울 · 송파구
        </Text>
        {/*<View style={[common.mb16, common.row]}>*/}
        {/*  <Text style={[common.text_s, styles.tag]}>#Tag</Text>*/}
        {/*  <Text style={[common.text_s, styles.tag]}>#Tag</Text>*/}
        {/*</View>*/}
        <Text style={[common.text_s, {color: GRAY.DARK}]}>
          2022.10.01 지원 완료
        </Text>
      </View>
      {/* 구인공고 탑 메인 */}

      {/* 공고 내용 */}
      <View style={common.mb24}>
        <Text style={[common.mb8, common.text_m, common.fwb]}>채용형태</Text>
        <Text style={common.text_m}>{recruitInfo.recruitType}</Text>
      </View>
      {recruitInfo.recruitType === 'FILL-IN' ? (
        <View style={common.mb24}>
          <Text style={[common.mb8, common.text_m, common.fwb]}>
            수업날짜 및 시간
          </Text>
          <Text style={common.text_m}>월,수,금 14:00 ~ 18:00</Text>
        </View>
      ) : (
        <View>
          <View style={common.mb24}>
            <Text style={[common.mb8, common.text_m, common.fwb]}>
              수업날짜
            </Text>
            <Text style={common.text_m}>월,수,금</Text>
          </View>
          <View style={common.mb24}>
            <Text style={[common.mb8, common.text_m, common.fwb]}>
              수업시간
            </Text>
            <Text style={common.text_m}>14:00 ~ 18:00</Text>
          </View>
        </View>
      )}

      <View style={common.mb24}>
        <Text style={[common.mb8, common.text_m, common.fwb]}>수업내용</Text>
        <Text style={common.text_m}>{recruitInfo.content}</Text>
      </View>
      <View style={common.mb24}>
        <Text style={[common.mb8, common.text_m, common.fwb]}>경력</Text>
        <Text style={common.text_m}>{recruitInfo.career}</Text>
      </View>
      <View style={common.mb24}>
        <Text style={[common.mb8, common.text_m, common.fwb]}>학력</Text>
        <Text style={common.text_m}>{recruitInfo.education}</Text>
      </View>
      <View style={common.mb24}>
        <Text style={[common.mb8, common.text_m, common.fwb]}>급여</Text>
        <Text style={common.text_m}>{recruitInfo.pay}</Text>
      </View>
      <View style={common.mb8}>
        <Text style={[common.mb8, common.text_m, common.fwb]}>센터 위치</Text>
        <Text style={common.text_m}>{recruitInfo.address}</Text>
      </View>

      <View style={common.mb24}>
        <Image
          style={common.mapBox}
          source={require('../assets/images/map_sample.png')}
        />
      </View>

      <View style={common.mb40}>
        <Text style={[common.mb8, common.text_m, common.fwb]}>센터 정보</Text>
        <CenterInfoComponent />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 40,
    backgroundColor: WHITE,
  },
  imgBox: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },

  tag: {marginRight: 8, color: GRAY.DARK},
});

export default JobPostScreen;
