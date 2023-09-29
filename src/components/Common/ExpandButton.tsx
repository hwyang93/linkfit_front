import { iconPath } from '@/lib/iconPath';
import THEME from '@/styles/theme';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import Icon from './Icon';

interface MoreButtonProps {
  style?: StyleProp<ViewStyle>;
  expanded: boolean;
  onPress: () => void;
}

const ExpandButton: React.FC<MoreButtonProps> = ({ style, expanded, onPress }) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Text style={{ fontSize: 16 }}>{expanded ? '접기' : '더보기'}</Text>
      <Icon source={expanded ? iconPath.CHEVRON_UP : iconPath.CHEVRON_DOWN} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: THEME.GREY03,
    borderRadius: 8,
  },
});

export default ExpandButton;
