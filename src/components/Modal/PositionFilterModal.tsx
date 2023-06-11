import FILTER from '@/utils/constants/filter';
import {iconPath} from '@/utils/iconPath';
import React, {useState} from 'react';
import {ImageSourcePropType} from 'react-native';
import BottomSheet from '../Common/BottomSheet';
import BottomSheetOption from '../Common/BottomSheetOption';
import CTAButton from '../Common/CTAButton';
import Icon from '../Common/Icon';

const positionOptionIcon: {[key: string]: ImageSourcePropType} = {
  전체: iconPath.LINK,
  필라테스: iconPath.PILATES,
  요가: iconPath.YOGA,
};

const selectedPositionOptionIcon: {[key: string]: ImageSourcePropType} = {
  전체: iconPath.LINK_ON,
  필라테스: iconPath.PILATES_ON,
  요가: iconPath.YOGA_ON,
};

interface PositionFilterModalProps {
  visible: boolean;
  iniitalOptions: string[];
  onApply: (options: string[]) => void;
  onDismiss: () => void;
}

const PositionFilterModal: React.FC<PositionFilterModalProps> = ({
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
    <BottomSheet visible={visible} onDismiss={onDismiss} title="포지션">
      {FILTER.POSITION.map((option, index) => (
        <BottomSheetOption
          key={index}
          label={option}
          selected={selectedOptions.includes(option)}
          leftIcon={
            <Icon
              source={
                selectedOptions.includes(option)
                  ? selectedPositionOptionIcon[option]
                  : positionOptionIcon[option]
              }
            />
          }
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

export default PositionFilterModal;
