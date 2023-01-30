import {Alert, Image, Pressable, View} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
import {iconPath} from '@util/iconPath';
import common from '@styles/common';

type HeaderRightProps = {
  // canGoBack: boolean;
  // tintColor?: string;
};

// todo : props 에 따른 헤더 형태 변경

// const HeaderLeft: React.FC<HeaderLeftProps> = ({canGoBack, tintColor}) => {
const HeaderLeft = ({}: HeaderRightProps) => {
  // const navigation = useNavigation();

  return (
    <View style={{flexDirection: 'row'}}>
      <Pressable
        onPress={() => Alert.alert('알림', '쪽지 클릭테스트에용')}
        hitSlop={10}
        style={[common.mr8, common.MESSAGE]}>
        <Image source={iconPath.MESSAGE} style={common.MESSAGE} />
      </Pressable>

      <Pressable
        onPress={() => Alert.alert('알림', '하트 클릭테스트에용')}
        hitSlop={10}
        style={common.FAVORITE}>
        <Image source={iconPath.FAVORITE} style={common.FAVORITE} />
      </Pressable>
    </View>
  );
};

export default HeaderLeft;