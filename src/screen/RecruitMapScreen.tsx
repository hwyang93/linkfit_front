import {Button, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';

function RecruitMapScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <View style={styles.container}>
      <Text style={common.text_m}>구인 지도 화면</Text>
      <Button
        title={'임시 리스트 링크'}
        onPress={() => navigation.navigate('RecruitList')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default RecruitMapScreen;
