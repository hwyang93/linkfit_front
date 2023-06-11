import common from '@/styles/common';
import {iconPath} from '@/utils/iconPath';
import React from 'react';
import {Pressable, StyleProp, Text, TextProps, ViewStyle} from 'react-native';
import Icon from './Icon';

interface SectionHeaderProps extends TextProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  style,
  onPress,
  ...props
}) => {
  return (
    <Pressable
      style={[common.rowCenterBetween, {height: 24}, style]}
      onPress={onPress}
      {...props}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          lineHeight: 16,
        }}>
        {title}
      </Text>
      {onPress && <Icon source={iconPath.CHEVRON_RIGHT} />}
    </Pressable>
  );
};

export default SectionHeader;
