import FILTER from '@/utils/constants/filter';
import React, {useState} from 'react';
import BottomSheet from '../Common/BottomSheet';
import BottomSheetOption from '../Common/BottomSheetOption';
import CTAButton from '../Common/CTAButton';

interface RecruitTypeFilterModalProps {
  visible: boolean;
  iniitalOptions: string[];
  onApply: (options: string[]) => void;
  onDismiss: () => void;
}

const RecruitTypeFilterModal: React.FC<RecruitTypeFilterModalProps> = ({
  visible,
  iniitalOptions,
  onDismiss,
  onApply,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(iniitalOptions);

  const handleOptionPress = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <BottomSheet visible={visible} onDismiss={onDismiss} title="채용형태">
      {FILTER.RECRUIT_TYPE.map((option, index) => (
        <BottomSheetOption
          key={index}
          label={option}
          selected={selectedOptions.includes(option)}
          onPress={() => handleOptionPress(option)}
        />
      ))}
      <CTAButton
        style={{marginHorizontal: 16, marginTop: 32}}
        label="필터 적용"
        onPress={() => onApply(selectedOptions)}
      />
    </BottomSheet>
  );
};

export default RecruitTypeFilterModal;
