import THEME from '@/styles/theme';
import { View } from 'react-native';
import EmptySet from '../EmptySet';

const EmployerReviewTab: React.FC = () => {
  // const modal = useModal();

  // const navigation = useAppNavigation();

  // const navigateToReviewEditScreen = () => {
  //   navigation.navigate(ROUTE.MY.REVIEW_EDIT, { reviewId: 1 });
  // };

  return (
    <View style={{ backgroundColor: THEME.WHITE, flex: 1 }}>
      <EmptySet text="준비중 입니다." />
    </View>
    // 기능 추가 후 주석 해제
    // <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    //   <View style={styles.reviewBox}>
    //     <View style={common.rowCenter}>
    //       <Image source={require('../../assets/images/thumbnail.png')} style={styles.thumbnail} />
    //       <View>
    //         <View style={common.rowCenter}>
    //           <Text style={[common.text_m, common.fwb, common.mr8]}>닉네임</Text>
    //           <Text style={[common.text_s, { color: BLUE.DEFAULT }]}>인증강사</Text>
    //           <Image
    //             style={{ marginLeft: 2, width: 14, height: 14 }}
    //             source={iconPath.CERTIFICATION}
    //           />
    //         </View>
    //         <View style={common.row}>
    //           <Text style={[common.text_s, common.fwb, common.mr8]}>필라테스</Text>
    //           <Text style={[common.text]}>3년</Text>
    //         </View>
    //       </View>
    //     </View>
    //     <Text style={[common.mt8, common.text]}>2022.12.12</Text>
    //     <Text style={common.text_m}>
    //       후기 내용입니다. 후기 내용입니다. 후기 내용입니다. 후기 내용입니다. 후기 내용입니다. 후기
    //       내용입니다.
    //     </Text>
    //     <Pressable style={styles.kebabIcon} hitSlop={10} onPress={modal.open}>
    //       <Image source={iconPath.KEBAB} style={[common.size24]} />
    //     </Pressable>
    //   </View>

    //   <View style={styles.reviewBox}>
    //     <View style={common.rowCenter}>
    //       <Text style={[common.text_m, common.fwb, common.mr8]}>센터명</Text>
    //       <Text style={common.text}>포지션</Text>
    //     </View>
    //     <Text style={[common.mt8, common.text]}>2022.12.12</Text>
    //     <Text style={common.text_m}>후기 내용입니다. 후기 내용입니다. 후기 내용입니다.</Text>

    //     <Pressable style={styles.kebabIcon} hitSlop={10} onPress={modal.open}>
    //       <Image source={iconPath.KEBAB} style={[common.size24]} />
    //     </Pressable>
    //   </View>
    //   <BottomSheet visible={modal.visible} onDismiss={modal.close}>
    //     <BottomSheetOption label="후기 수정하기" onPress={navigateToReviewEditScreen} />
    //     <BottomSheetOption label="후기 삭제하기" />
    //   </BottomSheet>
    // </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: WHITE },
//   reviewBox: {
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderColor: GRAY.DEFAULT,
//   },
//   thumbnail: { marginRight: 12, width: 48, height: 48 },
//   kebabIcon: { position: 'absolute', top: 16, right: 0 },
// });

export default EmployerReviewTab;
