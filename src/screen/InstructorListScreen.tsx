import {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import InstructorComponent from '@components/InstructorComponent';
import {fetchInstructors} from '@api/instructor';

function InstructorListScreen() {
  const [instructors, setInstructors] = useState(() => []);
  useEffect(() => {
    fetchInstructors()
      .then(({data}: any) => {
        console.log(data);
        setInstructors(data);
      })
      // .catch((e: {message: () => any}) => {
      //   console.log(e.message());
      // });
      .catch((message: any) => {
        console.log(message);
      });
  }, []);
  return (
    <View style={styles.container}>
      {/*강사 리스트 컴포넌트 */}
      <InstructorComponent
        list={instructors}
        title={'내 주변 강사'}
        text={'링크핏의 우수 강사를 확인하세요.'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 16},
});

export default InstructorListScreen;
