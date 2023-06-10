import THEME from '@/styles/theme';
import React from 'react';
import {Text, View} from 'react-native';
import RowView from '../Common/RowView';

interface ReviewListItemProps {
  nickname: string;
  role: string;
  timestamp: string;
  content: string;
}

const ReviewListItem: React.FC<ReviewListItemProps> = ({
  nickname,
  content,
  role,
  timestamp,
}) => {
  return (
    <View
      style={{
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: THEME.GREY04,
      }}>
      <RowView style={{alignItems: 'flex-end'}}>
        <Text style={{fontSize: 18, fontWeight: '700'}}>{nickname}</Text>
        <Text style={{fontSize: 12, color: THEME.GREY02, marginLeft: 4}}>
          {role}
        </Text>
        <Text style={{fontSize: 12, color: THEME.GREY02, marginLeft: 4}}>
          {timestamp}
        </Text>
      </RowView>
      <Text style={{fontSize: 16, marginTop: 8}}>{content}</Text>
    </View>
  );
};

export default ReviewListItem;
