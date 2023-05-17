import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useState} from 'react';
import common from '@styles/common';
import {GRAY, INPUT} from '@styles/colors';
import {iconPath} from '@/utils/iconPath';

type birthProps = {
  label?: string;
  onSelect?: any;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  textAlign?: string;
  icon?: string;
};

function BirthdayPicker({
  label,
  onSelect,
  placeholder,
  disabled,
  textAlign,
  icon,
}: birthProps) {
  const [focus, setFocus] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birth, setBirth] = useState('');
  const showDatePicker = () => {
    setFocus(true);
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setFocus(false);
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: any) => {
    setBirth(moment(date).format('YYYY.MM.DD'));
    onSelect(date);
    hideDatePicker();
  };

  return (
    <View>
      <View style={[common.inputWrapper]}>
        {label ? (
          <Text
            style={[common.label, {color: focus ? INPUT.FOCUS : GRAY.LIGHT}]}>
            {label}
          </Text>
        ) : null}
        <Pressable
          style={[common.textInput, focus && {borderColor: INPUT.FOCUS}]}
          onPress={showDatePicker}
          disabled={disabled}>
          {icon !== 'day' ? null : (
            <View style={{position: 'absolute', left: 16, top: 16}}>
              <Image source={iconPath.DAY} style={[common.size24]} />
            </View>
          )}
          {birth ? (
            <Text
              style={[
                styles.text,
                {color: '#292929'},
                textAlign === 'right' && {textAlign: 'right'},
              ]}>
              {birth}
            </Text>
          ) : (
            <Text
              style={[
                styles.text,
                textAlign === 'right' && {textAlign: 'right'},
              ]}>
              {placeholder}
            </Text>
          )}
        </Pressable>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: GRAY.DEFAULT,
    fontSize: 16,
  },
});

export default BirthdayPicker;
