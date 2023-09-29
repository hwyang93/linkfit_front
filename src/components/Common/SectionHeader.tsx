import { iconPath } from '@/lib/iconPath';
import common from '@/styles/common';
import React from 'react';
import { Pressable, StyleProp, Text, TextProps, ViewStyle } from 'react-native';
import Icon from './Icon';

interface SectionHeaderProps extends TextProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, style, onPress, ...props }) => {
  console.log(title);
  return (
    <Pressable
      style={[common.rowCenterBetween, { height: 24 }, style]}
      onPress={onPress}
      {...props}>
      <Text style={common.title_s}>{title}</Text>
      {onPress && <Icon source={iconPath.CHEVRON_RIGHT} />}
    </Pressable>
  );
};

export default SectionHeader;
