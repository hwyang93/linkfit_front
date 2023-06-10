import THEME from '@/styles/theme';
import {iconPath} from '@/utils/iconPath';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Icon from './Icon';

interface Props {
  label: string;
  selected?: boolean;
  leftIcon?: React.ReactNode;
  onPress?: () => void;
}

const BottomSheetOption: React.FC<Props> = ({
  label,
  selected = false,
  leftIcon,
  onPress,
}) => {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        paddingVertical: 16,
      }}
      onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {leftIcon && leftIcon}
        <Text
          style={[
            {fontSize: 18, marginLeft: leftIcon ? 10 : 0},
            selected && {color: THEME.PRIMARY},
          ]}>
          {label}
        </Text>
      </View>
      {selected && <Icon source={iconPath.CHECK} />}
    </Pressable>
  );
};

export default BottomSheetOption;
