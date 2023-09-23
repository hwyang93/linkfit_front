import Postcode from '@actbase/react-daum-postcode';
import { OnCompleteParams } from '@actbase/react-daum-postcode/lib/types';

interface SearchAddress {
  onSelectAddress: (data: OnCompleteParams) => void;
}

const SearchAddress: React.FC<SearchAddress> = ({ onSelectAddress }) => {
  const onSelect = (data: OnCompleteParams) => {
    onSelectAddress(data);
  };
  return (
    <Postcode
      style={{ width: '100%', height: '100%' }}
      jsOptions={{ animation: true, hideMapBtn: true }}
      onSelected={(data) => onSelect(data)}
      onError={() => {
        console.log('주소검색 로딩 실패');
      }}
    />
  );
};

export default SearchAddress;
