import THEME from '@/styles/theme';
import {iconPath} from '@/utils/iconPath';
import React from 'react';
import {Text, View} from 'react-native';
import IconButton from '../Common/IconButton';
import RowView from '../Common/RowView';

interface CenterProfileProps {
  name: string;
  field: string;
  isFavorite: boolean;
  favoriteCount: string;
  address: string;
  onFavorite?: () => void;
}

const CenterProfile: React.FC<CenterProfileProps> = ({
  name,
  field,
  isFavorite,
  favoriteCount,
  address,
  onFavorite,
}) => {
  return (
    <View>
      <RowView style={{alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: '700'}}>{name}</Text>
        <IconButton
          style={{marginLeft: 8}}
          source={isFavorite ? iconPath.FAVORITE_ON : iconPath.FAVORITE}
          onPress={onFavorite}
        />
        <Text style={{fontSize: 16, fontWeight: '700'}}>{favoriteCount}</Text>
      </RowView>
      <RowView style={{alignItems: 'center', marginTop: 8}}>
        <Text style={{fontSize: 16, fontWeight: '600'}}>{field}</Text>
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
