import { iconPath } from '@/lib/iconPath';
import THEME from '@/styles/theme';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import IconButton from '../Common/IconButton';

interface RecruitCardProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  recruitType: string;
  date: string;
  time: string;
  bookmarked: boolean;
  onPress?: () => void;
}

const RecruitCard: React.FC<RecruitCardProps> = ({
  style,
  title,
  recruitType,
  date,
  time,
  bookmarked,
  onPress,
}) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>{title}</Text>
        <Text
          style={{
            fontSize: 14,
            marginTop: 12,
            color: THEME.GREY02,
          }}>{`${recruitType} · ${date} · ${time}`}</Text>
      </View>
      <IconButton source={bookmarked ? iconPath.BOOKMARK_ON : iconPath.BOOKMARK} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: THEME.GREY03,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
});

export default RecruitCard;
