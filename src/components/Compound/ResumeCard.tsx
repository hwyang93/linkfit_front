import common from '@/styles/common';
import THEME from '@/styles/theme';
import {iconPath} from '@/utils/iconPath';
import React from 'react';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import Card from '../Common/Card';
import Chip from '../Common/Chip';
import IconButton from '../Common/IconButton';

interface ResumeCardProps {
  style?: StyleProp<ViewStyle>;
  isMaster: boolean;
  title: string;
  timestamp: string;
  kebabIconShown?: boolean;
  onKebabIconPress?: () => void;
  onPress?: () => void;
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  style,
  title,
  timestamp,
  kebabIconShown,
  isMaster = false,
  onPress,
  onKebabIconPress,
}) => {
  return (
    <Card style={style} onPress={onPress}>
      {isMaster && <Chip label="대표" />}
      <Text style={common.title}>{title}</Text>
      <Text style={[common.text_s, {color: THEME.GREY02}]}>{timestamp}</Text>
      {kebabIconShown && (
        <IconButton
          source={iconPath.KEBAB}
          style={styles.kebabIcon}
          onPress={onKebabIconPress}
        />
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  kebabIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});

export default ResumeCard;
