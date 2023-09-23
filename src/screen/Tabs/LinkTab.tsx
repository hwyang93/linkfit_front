import FloatingActionButton from '@/components/Common/FloatingActionButton';
import InstructorListItem from '@/components/Compound/InstructorListItem';
import { useInstructorListQuery } from '@/hooks/instructor/useInstructorListQuery';
import useExitAlert from '@/hooks/useExitAlert';
import { iconPath } from '@/utils/iconPath';
import LinkTop from '@components/LinkTop';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WHITE } from '@styles/colors';
import common from '@styles/common';
import { FlatList, StyleSheet, View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, 'Link'>;

const LinkScreen = ({ navigation }: Props) => {
  useExitAlert();

  const { data } = useInstructorListQuery();

  return (
    <>
      {data && (
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(item) => String(item.seq)}
            renderItem={({ item }) => (
              <InstructorListItem
                style={{ marginHorizontal: 16 }}
                instructorId={item.seq}
                avatarImageSrc={item.profileImage?.originFileUrl}
                field={item.field}
                career={item.career}
                nickname={item.nickname}
                address={item.address}
                following={item.isFollow === 'Y'}
                followerCount={item.followerCount}
                isCertificated
                onAvatarPress={() => navigation.navigate('Profile', { memberSeq: item.seq })}
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
