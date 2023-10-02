import { regionApi } from '@/api/region';
import { LabeledSelect, useLabeledSelect } from '@/hooks/use-labeled-select';
import { SCREEN_HEIGHT } from '@/lib/constants/common';
import { iconPath } from '@/lib/iconPath';
import THEME from '@/styles/theme';
import { useQuery } from '@tanstack/react-query';
import { Pressable, ScrollView, Text, View } from 'react-native';
import CTAButton from './Common/CTAButton';
import Icon from './Common/Icon';

export type Region = {
  city: { label: string; value: string };
  district: { label: string; value: string };
};

interface RegionSelectorProps {
  onSelect: (region: Region) => void;
}

export const RegionSelector = ({ onSelect }: RegionSelectorProps) => {
  const citySelect = useLabeledSelect();
  const districtSelect = useLabeledSelect();

  const isRegionSelected = Boolean(citySelect.data.value && districtSelect.data.value);

  const cityListQuery = useQuery({
    queryKey: ['region', 'city', 'list'],
    queryFn: regionApi.getCityList,
  });

  const districtListQuery = useQuery({
    queryKey: ['region', 'district', 'list', citySelect.data.value],
    queryFn: () => regionApi.getDistrictList(citySelect.data.value || ''),
    enabled: !!citySelect.data.value,
  });

  const onCitySelectChange = (value: LabeledSelect) => {
    citySelect.onChange(value);
    districtSelect.reset();
  };

  return (
    <View>
      <View
        style={{
          height: SCREEN_HEIGHT * 0.65,
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: THEME.GREY04,
        }}>
        <ScrollView style={{ flex: 1, borderRightWidth: 1, borderRightColor: THEME.GREY04 }}>
          {cityListQuery.data?.map((city, index) => (
            <CityListItem
              key={index}
              selected={citySelect.data.value === city.code}
              value={city.code}
              label={city.name}
              onPress={onCitySelectChange}
            />
          ))}
        </ScrollView>
        <ScrollView style={{ flex: 1 }}>
          {districtListQuery.data?.map((district, index) => (
            <DistrictListItem
              key={index}
              selected={districtSelect.data.value === district.code}
              value={district.code}
              label={district.name}
              onPress={districtSelect.onChange}
            />
          ))}
        </ScrollView>
      </View>
      <View style={{ marginTop: 16 }}>
        {!isRegionSelected && (
          <Text style={{ fontSize: 16, height: 26 }}>활동 지역을 선택해 주세요.</Text>
        )}
        {isRegionSelected && (
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 26 }}>
            <Text style={{ fontSize: 16, marginRight: 8 }}>선택한 활동 지역은</Text>
            <Text style={{ fontSize: 20, marginRight: 8, fontWeight: '700' }}>
              {citySelect.data.label}시 {districtSelect.data.label}
            </Text>
            <Text style={{ fontSize: 16 }}>입니다.</Text>
          </View>
        )}
      </View>
      <CTAButton
        disabled={!isRegionSelected}
        style={{ marginTop: 40 }}
        label="이 지역으로 설정하기"
        onPress={() =>
          onSelect({
            city: { value: citySelect.data.value, label: citySelect.data.label },
            district: { value: districtSelect.data.value, label: districtSelect.data.label },
          })
        }
      />
    </View>
  );
};

interface ListItemProps {
  selected?: boolean;
  value: string;
  label: string;
  onPress: (data: LabeledSelect) => void;
}

const CityListItem = ({ selected = false, value, label, onPress }: ListItemProps) => {
  return (
    <Pressable
      style={[
        {
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 6,
          height: 32,
        },
        selected && { backgroundColor: THEME.PRIMARY05 },
      ]}
      onPress={() => onPress({ label, value })}>
      <Text style={[{ fontSize: 14 }, selected && { color: THEME.PRIMARY, fontWeight: '700' }]}>
        {label}
      </Text>
      <Icon source={iconPath.CHEVRON_RIGHT} style={[selected && { tintColor: THEME.PRIMARY }]} />
    </Pressable>
  );
};

const DistrictListItem = ({ selected = false, value, label, onPress }: ListItemProps) => {
  return (
    <Pressable
      style={[
        {
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 6,
          height: 32,
        },
        selected && { backgroundColor: THEME.PRIMARY05 },
      ]}
      onPress={() => onPress({ value, label })}>
      <Text style={[{ fontSize: 14 }, selected && { color: THEME.PRIMARY, fontWeight: '700' }]}>
        {label}
      </Text>
      {selected && (
        <Icon source={iconPath.CHECK_BLACK} style={[selected && { tintColor: THEME.PRIMARY }]} />
      )}
    </Pressable>
  );
};
