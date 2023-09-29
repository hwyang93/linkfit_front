import THEME from '@/styles/theme';
import { iconPath } from '@/utils/iconPath';
import React from 'react';
import { Text, View } from 'react-native';
import IconButton from '../Common/IconButton';
import RowView from '../Common/RowView';

interface CenterProfileProps {
  centerId: number;
  name: string;
  field: string;
  isFavorite: boolean;
  favoriteCount: string;
  address: string;
}

const CenterProfile: React.FC<CenterProfileProps> = ({
  centerId,
  name,
  field,
  isFavorite,
  favoriteCount,
  address,
}) => {
  const onFavorite = () => {
    // TODO: api 연동
    console.log('하트 아이콘 클릭');
  };

  return (
    <View>
      <RowView style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>{name}</Text>
        <IconButton
          style={{ marginLeft: 8 }}
          source={isFavorite ? iconPath.FAVORITE_ON : iconPath.FAVORITE}
          onPress={onFavorite}
        />
        <Text style={{ fontSize: 16, fontWeight: '700' }}>{favoriteCount}</Text>
      </RowView>
      <RowView style={{ alignItems: 'center', marginTop: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>{field}</Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: THEME.GREY02,
            marginLeft: 8,
          }}>
          {address}
        </Text>
      </RowView>
    </View>
  );
};

export default CenterProfile;
