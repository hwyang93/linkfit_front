import React from 'react';
import {Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

type HeaderLeftProps = {
  canGoBack: boolean;
  tintColor?: string;
};

// const HeaderLeft: React.FC<HeaderLeftProps> = ({canGoBack, tintColor}) => {
const HeaderLeft = ({canGoBack, tintColor}: HeaderLeftProps) => {
  const navigation = useNavigation();
  if (!canGoBack) {
    return null;
  }
  return (
    <Pressable onPress={navigation.goBack} hitSlop={10}>
      <Text>
        <Icon name="angle-left" size={24} color={tintColor} />
      </Text>
    </Pressable>
  );
};

export default HeaderLeft;
