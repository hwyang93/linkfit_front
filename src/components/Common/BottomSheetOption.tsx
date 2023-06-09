import THEME from '@/styles/theme';
import {iconPath} from '@/utils/iconPath';
import React from 'react';
import {Pressable, Text} from 'react-native';
import Icon from './Icon';

interface Props {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

const BottomSheetOption: React.FC<Props> = ({
  label,
  selected = false,
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
      <Text style={[{fontSize: 18}, selected && {color: THEME.PRIMARY}]}>
        {label}
      </Text>
      {selected && <Icon source={iconPath.CHECK} />}
    </Pressable>
  );
};

export default BottomSheetOption;
