import {Pressable, SafeAreaView, StyleSheet, Text} from 'react-native';

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import ProfileScreenTabView from '@screen/ProfileScreenTabView';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {LoggedInParamList} from '../../AppInner';

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const route = useRoute<RouteProp<LoggedInParamList, 'Profile'>>();
  const [memberSeq] = useState(route.params.memberSeq);

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* 탭뷰 컴포넌트 */}
      <ProfileScreenTabView />
      {/* 제안하기 버튼 */}
      <Pressable
        style={styles.suggestion}
        onPress={() =>
          navigation.navigate('Suggestion', {targetMemberSeq: memberSeq})
        }>
        <LinearGradient
          style={[common.button, {height: 40}]}
          start={{x: 0.1, y: 0.5}}
          end={{x: 0.6, y: 1}}
          colors={['#74ebe4', '#3962f3']}>
          <Text style={[common.text_s, common.fwb, {color: WHITE}]}>
            제안하기
          </Text>
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  suggestion: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 104,
    height: 40,
  },
});

export default ProfileScreen;
