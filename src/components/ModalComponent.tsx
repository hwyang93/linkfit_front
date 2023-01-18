import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {WHITE} from '@styles/colors';

// export const FilterTypes = {
//   POSITION: 'POSITION',
//   RECRUITMENT_TYPE: 'RECRUITMENT_TYPE',
//   TIME: 'TIME',
//   RESET: 'RESET',
// };

function ModalComponent() {
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <TouchableOpacity>
          <Text>전체</Text>
        </TouchableOpacity>
        <Text>필라테스</Text>
        <Text>요가</Text>
        <Pressable>
          <Text>버튼</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    width: '100%',
    height: 200,
    backgroundColor: WHITE,
  },
});
export default ModalComponent;
