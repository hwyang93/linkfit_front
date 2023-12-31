import { iconPath } from '@/lib/iconPath';
import THEME from '@/styles/theme';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Icon from './Icon';

interface Props {
  label: string;
  selected?: boolean;
  leftIcon?: React.ReactNode;
  onPress?: () => void;
}

const BottomSheetOption: React.FC<Props> = ({ label, selected = false, leftIcon, onPress }) => {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        paddingVertical: 16,
        height: 56,
      }}
      onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {leftIcon && leftIcon}
        <Text
          style={[
            { fontSize: 18, marginLeft: leftIcon ? 10 : 0 },
            { fontWeight: selected ? '700' : '400' },
            // selected && {color: THEME.PRIMARY},
            { color: selected ? THEME.PRIMARY : THEME.BLACK },
          ]}>
          {label}
        </Text>
      </View>
      {selected && <Icon source={iconPath.CHECK} />}
    </Pressable>
  );
};

export default BottomSheetOption;
