import {iconPath} from '@/utils/iconPath';
import common from '@styles/common';
import {Alert, Image, Pressable, View} from 'react-native';

// TODO : props 에 따른 헤더 형태 변경

const HeaderRight: React.FC = () => {
  // const navigation = useNavigation();

  return (
    <View style={{flexDirection: 'row'}}>
      <Pressable
        onPress={() => Alert.alert('알림', '쪽지 클릭테스트에용')}
        hitSlop={10}
        style={[common.mh4, common.size24]}>
        <Image source={iconPath.MESSAGE} style={common.size24} />
      </Pressable>

      <Pressable
        onPress={() => Alert.alert('알림', '하트 클릭테스트에용')}
        hitSlop={10}
        style={[common.mh4, common.size24]}>
        <Image source={iconPath.FAVORITE} style={common.size24} />
      </Pressable>
    </View>
  );
};

export default HeaderRight;
