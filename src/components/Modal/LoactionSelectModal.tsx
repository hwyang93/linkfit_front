import { Text } from 'react-native';
import BottomSheet from '../Common/BottomSheet';
import CTAButton from '../Common/CTAButton';
import { LocationSelectList } from '../LocationSelectList';

interface LocationSelectModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const LocationSelectModal: React.FC<LocationSelectModalProps> = ({ visible, onDismiss }) => {
  return (
    <BottomSheet title="활동 지역" visible={visible} onDismiss={onDismiss}>
      <LocationSelectList />
      <Text>
        선택한 활동 지역은 <Text>서울시 강남구</Text>입니다.
      </Text>
      <CTAButton label="이 지역으로 설정하기" />
    </BottomSheet>
  );
};
