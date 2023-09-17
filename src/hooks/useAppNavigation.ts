import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';

export const useAppNavigation = () => {
  return useNavigation<NavigationProp<LoggedInParamList>>();
};
