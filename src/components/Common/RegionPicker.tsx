import useModal from '@/hooks/use-modal';
import { View } from 'react-native';
import { Region, RegionSelector } from '../RegionSelector';
import { PickerField } from './\bPickerField';
import BottomSheet from './BottomSheet';

interface RegionPickerProps {
  value: string;
  onSelect: (region: Region) => void;
}

export const RegionPicker = ({ value, onSelect }: RegionPickerProps) => {
  const modal = useModal();

  const onRegionSelectorSelect = (region: Region) => {
    onSelect(region);
    modal.close();
  };

  return (
    <View>
      <PickerField
        label="활동 지역"
        value={value}
        placeholder="활동 지역을 선택하세요."
        onPress={modal.open}
        focused={modal.visible}
      />
      <BottomSheet
        scrollable={false}
        visible={modal.visible}
        onDismiss={modal.close}
        title="활동 지역">
        <View style={{ marginTop: 16, marginHorizontal: 16 }}>
          <RegionSelector onSelect={onRegionSelectorSelect} />
        </View>
      </BottomSheet>
    </View>
  );
};
