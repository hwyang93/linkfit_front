import AppSafeAreaView from '@/components/\bLayout/AppSafeAreaView';
import AppScrollView from '@/components/\bLayout/AppScrollView';
import ResumeCard from '@/components/Compound/ResumeCard';
import EmptySet from '@/components/EmptySet';
import { useResumeList } from '@/hooks/resume/use-resume-list';
import { ROUTE } from '@/lib/constants/route';
import { formatDate } from '@/lib/util';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoggedInParamList } from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.RESUME_MANAGE>;

export const ResumeManageScreen = ({ navigation }: Props) => {
  const resumeListQuery = useResumeList();
  const resumes = resumeListQuery.data;

  return (
    <AppSafeAreaView edges={['bottom']}>
      {resumes && resumes.length === 0 && <EmptySet text="등록된 이력서가 없어요." />}
      {resumes && resumes.length > 0 && (
        <AppScrollView style={{ padding: 16 }}>
          {resumes.map((resume) => (
            <ResumeCard
              resumeId={resume.seq}
              style={{ marginBottom: 8 }}
              key={resume.seq}
              isMaster={resume.isMaster === 'Y'}
              title={resume.title}
              timestamp={formatDate(resume.updatedAt)}
              kebabIconShown
              onPress={() =>
                navigation.navigate(ROUTE.RESUME.PREVIEW, {
                  resumeSeq: resume.seq,
                })
              }
            />
          ))}
          {/* <Modal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            title={'더보기'}
            content={
              <View>
                {MODAL.map((item, index) => (
                  <View key={index} style={common.modalItemBox}>
                    <Pressable
                      onPress={item.job}
                      style={[common.rowCenterBetween, { width: '100%' }]}>
                      <Text style={[common.modalText, item.selected && { color: BLUE.DEFAULT }]}>
                        {item.value}
                      </Text>
                      {item.selected && <Image source={iconPath.CHECK} style={common.size24} />}
                    </Pressable>
                  </View>
                ))}
              </View>
            }
          /> */}
        </AppScrollView>
      )}
    </AppSafeAreaView>
  );
};
