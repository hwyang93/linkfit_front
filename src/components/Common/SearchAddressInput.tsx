import {iconPath} from '@/utils/iconPath';
import {GRAY, INPUT} from '@styles/colors';
import common from '@styles/common';
import {useCallback, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import SearchAddress from '@components/Common/SearchAddress';
import BottomSheet from '@components/Common/BottomSheet';
import useModal from '@hooks/useModal';
import axios, {isAxiosError} from 'axios';
import Config from 'react-native-config';
import toast from '@hooks/toast';

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
  placeholder: string;
  value?: any;
  onChangeText?: any;
  keyboardType?: any;
  secureTextEntry?: boolean;
  isEmail?: boolean;
  propStyles?: {
    inputWrapper?: object;
  };
  onSubmitEditing?: any;
  blurOnSubmit?: boolean;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  comment?: boolean;
  icon?: string;
  textAlign?: any;
}

const SearchAddressInput = ({
  label,
  placeholder,
  value,
  propStyles,
  pointerEvents,
  editable,
  multiline,
  numberOfLines,
  maxLength,
  comment,
  icon,
  textAlign,
  onChangeText,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const {modalVisible, openModal, closeModal} = useModal();
  const [address, setAddress] = useState('');
  const [coordinate, setCoordinate] = useState<{
    x: number | null;
    y: number | null;
  }>({x: null, y: null});

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const searchCoord = async (address: string) => {
    try {
      await axios
        .get(
          `https://dapi.kakao.com//v2/local/search/address.json?analyze_type=exact&query=${address}`,
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
    async (data: any) => {
      setAddress(data.address);
      searchCoord(data.address);
      onChangeText({address, coordinate});
      closeModal();
    },
    [address, closeModal, coordinate, onChangeText],
  );

  return (
    <View>
      <Pressable onPress={() => openModal()}>
        <View style={[common.inputWrapper, propStyles?.inputWrapper]}>
          <Text
            style={[
              common.label,
              {color: value || isFocused ? INPUT.FOCUS : GRAY.LIGHT},
              // {color: value && !isFocused ? INPUT.DEFAULT : INPUT.DEFAULT},
            ]}>
            {label}
          </Text>

          <TextInput
            {...props}
            style={[
              common.textInput,
              {
                borderColor: value || isFocused ? INPUT.FOCUS : GRAY.LIGHT,
                paddingLeft: icon && 50,
              },
              multiline && styles.multiline,
              comment && styles.comment,
            ]}
            value={address}
            placeholderTextColor="#acacac"
            importantForAutofill="yes"
            clearButtonMode="while-editing"
            autoCapitalize="none"
            blurOnSubmit={false}
            placeholder={placeholder}
            textContentType={'none'}
            pointerEvents={pointerEvents}
            onBlur={onBlur}
            onFocus={onFocus}
            editable={editable}
            multiline={multiline}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
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
        content={
          <SearchAddress onSelectAddress={(data: any) => selectAddress(data)} />
        }
      />
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
