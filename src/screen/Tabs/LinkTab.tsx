import FloatingActionButton from '@/components/Common/FloatingActionButton';
import InstructorListItem from '@/components/Compound/InstructorListItem';
import useExitAlert from '@/hooks/useExitAlert';
import useQuery from '@/hooks/useQuery';
import {iconPath} from '@/utils/iconPath';
import {fetchRecommendedInstructors} from '@api/instructor';
import LinkTop from '@components/LinkTop';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {FlatList, StyleSheet, View} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, 'Link'>;

const LinkScreen = ({navigation}: Props) => {
  const {data: instructors} = useQuery({
    queryFn: () => fetchRecommendedInstructors().then(res => res.data),
    onError: error => {
      if (isAxiosError(error)) {
        toast.error({message: error.message});
      }
    },
  });

  useExitAlert();

  return (
    <>
      {instructors && (
        <View style={styles.container}>
          <FlatList
            data={instructors}
            keyExtractor={item => item.seq}
            renderItem={({item}: any) => (
              <InstructorListItem
                style={{marginHorizontal: 16}}
                avatarImageSrc={item.profileImage?.originFileUrl}
                field={item.field}
                career={item.career}
                nickname={item.nickname}
                address={item.address}
                followerCount={item.followerCount}
                isCertificated
                onAvatarPress={() =>
                  navigation.navigate('Profile', {memberSeq: item.seq})
                }
              />
            )}
            ListHeaderComponent={<LinkTop />}
            ItemSeparatorComponent={() => <View style={common.separator} />}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.fabContainer}>
            <FloatingActionButton
              iconSource={iconPath.PENCIL_W}
              onPress={() => navigation.navigate('JobOfferForm')}
            />
          </View>
        </View>
      )}
    </>
  );
};

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

export default LinkScreen;
