import common from '@styles/common';
import {Pressable, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';

type titleProps = {
  title: string;
  link?: any;
  button?: boolean;
};

function MyTitle({title, button, link}: titleProps) {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <View style={[common.rowCenterBetween]}>
      <Text style={common.title_s}>{title}</Text>
      {button && (
        <Pressable hitSlop={10} onPress={() => navigation.navigate(link)}>
          <FontAwesome name={'chevron-right'} color="black" />
        </Pressable>
      )}
    </View>
  );
}

export default MyTitle;
