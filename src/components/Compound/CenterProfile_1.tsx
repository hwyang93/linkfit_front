import THEME from '@/styles/theme';
import SRC from '@/utils/constants/assets';
import { FieldTypeKo } from '@/utils/constants/enum';
import { iconPath } from '@/utils/iconPath';
import React from 'react';
import { Image, Text, View } from 'react-native';
import IconButton from '../Common/IconButton';
import RowView from '../Common/RowView';

interface CenterProfile1Props {
  centerId: number;
  name: string;
  field: FieldTypeKo;
  isFavorite: boolean;
  address: string;
}

export const CenterProfile1: React.FC<CenterProfile1Props> = ({
  centerId,
  name,
  field,
  isFavorite,
  address,
}) => {
  const onFavorite = () => {
    // TODO: api 연동
    console.log('하트 아이콘 클릭');
  };

  return (
    <View>
      <Image style={{ width: '100%', height: 160, borderRadius: 8 }} source={SRC.IMAGES.CENTER01} />
      <RowView style={{ marginTop: 16 }}>
        <View>
          <Text style={{ fontWeight: '700', fontSize: 20 }}>{name}</Text>
          <RowView style={{ marginTop: 8, alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: THEME.GREY02, marginRight: 8 }}>{field}</Text>
            <Text style={{ fontSize: 14, color: THEME.GREY02, marginRight: 8 }}>{'|'}</Text>
            <Text style={{ fontSize: 14, color: THEME.GREY02 }}>{address}</Text>
          </RowView>
        </View>
        <RowView style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <IconButton source={iconPath.PHONE} style={{ marginRight: 8 }} />
          <IconButton
            source={isFavorite ? iconPath.FAVORITE_FILL : iconPath.FAVORITE}
            onPress={onFavorite}
          />
        </RowView>
      </RowView>
    </View>
  );
};
