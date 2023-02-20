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
    <Pressable
      style={[common.rowCenterBetween]}
      onPress={() => navigation.navigate(link)}>
      <Text style={common.title_s}>{title}</Text>
      {button && (
        <View>
          <FontAwesome name={'chevron-right'} color="black" />
        </View>
      )}
    </Pressable>
  );
}

export default MyTitle;
