import common from '@styles/common';
import {Alert, Pressable, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type titleProps = {
  title: string;
  link?: any;
  button?: boolean;
};

function MyTitle({title, button, link}: titleProps) {
  return (
    <View style={[common.rowCenterBetween]}>
      <Text style={common.title_s}>{title}</Text>
      {button && (
        <Pressable hitSlop={10} onPress={() => Alert.alert('click', 'test')}>
          <FontAwesome name={'chevron-right'} color="black" />
        </Pressable>
      )}
    </View>
  );
}

export default MyTitle;
