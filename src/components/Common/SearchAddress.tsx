import Postcode from '@actbase/react-daum-postcode';

interface SearchAddress {
  onSelectAddress: Function;
}

const SearchAddress: React.FC<SearchAddress> = ({onSelectAddress}) => {
  const onSelect = (data: any) => {
    onSelectAddress(data);
  };
  return (
    <Postcode
      style={{width: '100%', height: '100%'}}
      jsOptions={{animation: true, hideMapBtn: true}}
      onSelected={data => onSelect(data)}
      onError={() => {
        console.log('주소검색 로딩 실패');
      }}
    />
  );
};

export default SearchAddress;
