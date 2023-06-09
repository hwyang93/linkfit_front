import {iconPath} from '@/utils/iconPath';
import common from '@styles/common';
import {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import BottomSheet from '@components/Common/BottomSheet';
import SearchAddress from '@components/Common/SearchAddress';
import toast from '@hooks/toast';
import useModal from '@hooks/useModal';
import axios, {isAxiosError} from 'axios';
import Config from 'react-native-config';

export const KeyboardTypes = {
  DEFAULT: 'default',
  EMAIL: 'email-address',
  PHONE: 'phone-pad',
  NUMBER: 'number-pad',
};

export const ReturnKeyTypes = {
  DONE: 'done',
  NEXT: 'next',
};

interface InputProps {
  pointerEvents?: any;
  label?: string;
  value?: any;
  onChangeText?: any;
  keyboardType?: any;
  secureTextEntry?: boolean;
  propStyles?: {
    inputWrapper?: object;
  };
  onSubmitEditing?: any;
  blurOnSubmit?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  comment?: boolean;
  icon?: string;
  textAlign?: any;
}

const SearchAddressInput = ({
  label,
  value,
  propStyles,
  pointerEvents,
  comment,
  icon,
  textAlign,
  onChangeText,
  ...props
}: InputProps) => {
  // const [isFocused, setIsFocused] = useState(false);
  const {modalVisible, openModal, closeModal} = useModal();
  const [address, setAddress] = useState('');
  const [coordinate, setCoordinate] = useState<{
    x: number | null;
    y: number | null;
  }>({x: null, y: null});

  // const onBlur = () => {
  //   setIsFocused(false);
  // };
  //
  // const onFocus = () => {
  //   setIsFocused(true);
  // };
  const searchCoord = (address: string) => {
    try {
      axios
        .get(
          `https://dapi.kakao.com/v2/local/search/address.json?analyze_type=exact&query=${address}`,
          {
            headers: {
              Authorization: `KakaoAK ${Config.KAKAO_API_REST_KEY}`,
            },
          },
        )
        .then(response => {
          setCoordinate({
            x: response.data.documents[0]?.address.x,
            y: response.data.documents[0]?.address.y,
          });
        });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error({message: error.message});
      }
    }
  };

  const selectAddress = useCallback(
    (data: any) => {
      setAddress(data.address);
      searchCoord(data.address);
      closeModal();
    },
    [closeModal],
  );

  useEffect(() => {
    onChangeText({address, coordinate});
  }, [address, coordinate, onChangeText]);

  return (
    <View>
      <Pressable onPress={() => openModal()}>
        <View style={[common.inputWrapper, propStyles?.inputWrapper]}>
          <Text style={[common.label]}>{label}</Text>

          <TextInput
            {...props}
            style={[
              common.textInput,
              {
                paddingLeft: icon && 50,
              },
              comment && styles.comment,
            ]}
            value={address}
            placeholderTextColor="#acacac"
            importantForAutofill="yes"
            clearButtonMode="while-editing"
            autoCapitalize="none"
            blurOnSubmit={false}
            placeholder={'주소를 검색하세요.'}
            textContentType={'none'}
            pointerEvents={pointerEvents}
            editable={false}
            multiline={false}
            numberOfLines={1}
            textAlign={textAlign}
          />
          <View style={{position: 'absolute', right: 16, top: 16}}>
            <Image source={iconPath.SEARCH} style={[common.size24]} />
          </View>
        </View>
      </Pressable>
      <BottomSheet
        visible={modalVisible}
        onDismiss={closeModal}
        useScroll={false}>
        <SearchAddress onSelectAddress={(data: any) => selectAddress(data)} />
      </BottomSheet>
    </View>
  );
};

SearchAddressInput.defaultProps = {
  returnKeyType: ReturnKeyTypes.DONE,
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
