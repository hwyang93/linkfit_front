import { NavigationProp, useNavigation } from '@react-navigation/native';
import common from '@styles/common';
import { Pressable, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LoggedInParamList } from '../../../AppInner';

interface MyTitleProps {
  title: string;
  link?: any;
  button?: boolean;
}

const MyTitle: React.FC<MyTitleProps> = ({ title, button, link }) => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <Pressable style={[common.rowCenterBetween]} onPress={() => navigation.navigate(link)}>
      <Text style={common.title_s}>{title}</Text>
      {button && (
        <View>
          <FontAwesome name={'chevron-right'} color="black" />
        </View>
      )}
    </Pressable>
  );
};

export default MyTitle;
