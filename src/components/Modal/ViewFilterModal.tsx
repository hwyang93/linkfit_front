import FILTER from '@/lib/constants/filter';
import { useState } from 'react';
import BottomSheet from '../Common/BottomSheet';
import BottomSheetOption from '../Common/BottomSheetOption';
import CTAButton from '../Common/CTAButton';

interface ViewFilterModalProps {
  visible: boolean;
  initialOptions: string[];
  onApply: (options: string[]) => void;
  onDismiss: () => void;
}

const ViewFilterModal: React.FC<ViewFilterModalProps> = ({
  visible,
  initialOptions,
  onApply,
  onDismiss,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(initialOptions);

  const handleOptionPress = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <BottomSheet visible={visible} onDismiss={onDismiss} title="조회순">
      {FILTER.VIEW.map((option, index) => (
        <BottomSheetOption
          key={index}
          label={option}
          selected={selectedOptions.includes(option)}
          onPress={() => handleOptionPress(option)}
        />
      ))}
      <CTAButton
        style={{ marginHorizontal: 16, marginTop: 32 }}
        label="필터 적용"
        onPress={() => onApply(selectedOptions)}
      />
    </BottomSheet>
  );
};

export default ViewFilterModal;
