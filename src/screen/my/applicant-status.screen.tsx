import BottomSheet from '@/components/Common/BottomSheet';
import BottomSheetOption from '@/components/Common/BottomSheetOption';
import Card from '@/components/Common/Card';
import ApplicantWaitingTab from '@/components/My/ApplicantWaitingTab';
import { useRecruitApplicationList } from '@/hooks/recruit/use-recruit-application-list';
import useModal from '@/hooks/use-modal';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { materialTopTabNavigationOptions } from '@/lib/options/tab';
import { formatDate } from '@/lib/util';
import ApplicantFinishTab from '@components/My/ApplicantFinishTab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

const Tab = createMaterialTopTabNavigator();

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.APPLICANT_STATUS>;

export const ApplicantStatusScreen = ({ route, navigation }: Props) => {
  const { data } = useRecruitApplicationList(route.params.recruitSeq);

  const recruitInfo = data?.recruit;

  const modal = useModal();

  if (!recruitInfo) return null;

  return (
    <>
      <View style={styles.container}>
        <Card style={common.mv4}>
          <View style={common.rowCenter}>
            <Text style={[common.text_s, common.fcg]}>
              {formatDate(recruitInfo.createdAt)} 작성
            </Text>
            <Text style={[common.mh8, common.fcg]}>|</Text>
            <Text style={[common.text_s, common.fcg]}>
              {recruitInfo.status === 'ING' ? '진행중' : '마감'}
            </Text>
          </View>
          <Text style={[common.title, { marginTop: 8 }]} numberOfLines={1}>
            {recruitInfo.title}
          </Text>
          <Text style={[common.text_m, common.fwb, { marginTop: 8 }]}>{recruitInfo.position}</Text>
          <Pressable style={styles.kebabIcon} hitSlop={10} onPress={modal.open}>
            <Image source={iconPath.KEBAB} style={common.size24} />
          </Pressable>
        </Card>
      </View>
      <BottomSheet visible={modal.visible} onDismiss={modal.close} title="타이틀">
        <BottomSheetOption
          label="공고 수정하기"
          onPress={() => {
            modal.close();
            navigation.navigate(ROUTE.RECRUIT.EDIT, {
              recruitId: recruitInfo.seq,
            });
          }}
        />
        <BottomSheetOption label="공고 복사하기" />
      </BottomSheet>
      <Tab.Navigator screenOptions={materialTopTabNavigationOptions}>
        <Tab.Screen name="대기중">
          {() => <ApplicantWaitingTab recruitId={route.params.recruitSeq} />}
        </Tab.Screen>
        <Tab.Screen name="완료">
          {() => <ApplicantFinishTab recruitId={route.params.recruitSeq} />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    padding: 16,
  },
  kebabIcon: { position: 'absolute', right: 16, top: 16 },
});
