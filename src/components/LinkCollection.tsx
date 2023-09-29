import { iconPath } from '@/lib/iconPath';
import common from '@styles/common';
import { Alert, Image, Pressable, View } from 'react-native';

const LinkCollection: React.FC = () => {
  return (
    <View style={[common.rowCenterBetween]}>
      <View style={[common.rowCenter, { justifyContent: 'space-around' }]}>
        <Pressable style={common.mh4} onPress={() => Alert.alert('알림', '클릭테스트에용')}>
          <Image source={iconPath.LINK_URL} style={[common.size24]} />
        </Pressable>
        <Pressable style={common.mh4} onPress={() => Alert.alert('알림', '클릭테스트에용')}>
          <Image source={iconPath.LINK_BLOG} style={[common.size24]} />
        </Pressable>
        <Pressable style={common.mh4} onPress={() => Alert.alert('알림', '클릭테스트에용')}>
          <Image source={iconPath.LINK_BRUNCH} style={[common.size24]} />
        </Pressable>
      </View>
    </View>
  );
};

export default LinkCollection;
