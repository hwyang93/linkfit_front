import { getKakaoCoordinate } from '@/api/kakao';
import { Coordinate } from '@/types/common';
import { iconPath } from '@/utils/iconPath';
import { OnCompleteParams } from '@actbase/react-daum-postcode/lib/types';
import BottomSheet from '@components/Common/BottomSheet';
import SearchAddress from '@components/Common/SearchAddress';
import toast from '@hooks/toast';
import useModal from '@hooks/useModal';
import common from '@styles/common';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import Icon from './Icon';

interface SearchAddressInputProps extends TextInputProps {
  label: string;
  comment?: boolean;
  icon?: string;
  onChangeAddress: ({
    address,
    coordinate,
  }: {
    address: string;
    coordinate: Coordinate | null;
  }) => void;
}

const SearchAddressInput: React.FC<SearchAddressInputProps> = ({
  label,
  comment,
  icon,
  onChangeAddress,
  ...props
}) => {
  const modal = useModal();
  const [address, setAddress] = useState('');
  const [coordinate, setCoordinate] = useState<Coordinate | null>(null);

  const searchCoord = async (address: string) => {
    try {
      const response = await getKakaoCoordinate(address);
      setCoordinate({
        x: response.data.documents[0]?.address.x,
        y: response.data.documents[0]?.address.y,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error({ message: error.message });
      }
    }
  };

  const selectAddress = (data: OnCompleteParams) => {
    setAddress(data.address);
    searchCoord(data.address);
    modal.close();
  };

  useEffect(() => {
    onChangeAddress({ address, coordinate });
  }, [address, coordinate, onChangeAddress]);

  return (
    <View>
      <Pressable onPress={modal.open}>
        <View style={common.inputWrapper}>
          <Text style={[common.label]}>{label}</Text>
          <TextInput
            style={[common.textInput, { paddingLeft: icon && 50 }, comment && styles.comment]}
            value={address}
            placeholderTextColor="#acacac"
            importantForAutofill="yes"
            clearButtonMode="while-editing"
            autoCapitalize="none"
            blurOnSubmit={false}
            placeholder="주소를 검색하세요."
            textContentType="none"
            editable={false}
            multiline={false}
            numberOfLines={1}
            returnKeyType="done"
            {...props}
          />
          <View style={{ position: 'absolute', right: 16, top: 16 }}>
            <Icon source={iconPath.SEARCH} />
          </View>
        </View>
      </Pressable>
      <BottomSheet visible={modal.visible} onDismiss={modal.close} useScroll={false}>
        <SearchAddress onSelectAddress={selectAddress} />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  multiline: {
    height: 276,
    textAlignVertical: 'top',
    paddingTop: 16,
  },
  comment: {
    height: 40,
    paddingVertical: 0,
  },
});

export default SearchAddressInput;
