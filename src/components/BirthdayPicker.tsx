import {Pressable, StyleSheet, Text, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useState} from 'react';
import common from '@styles/common';
import {GRAY, INPUT} from '@styles/colors';

type birthProps = {
  label?: string;
  onSelect?: any;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
};

function BirthdayPicker({label, onSelect, placeholder, disabled}: birthProps) {
  const [focus, setFocus] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birth, setBirth] = useState('');
  const showDatePicker = () => {
    setFocus(true);
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: any) => {
    setBirth(moment(date).format('YYYY.MM.DD'));
    console.log('생일은 바로...', birth);
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
          {birth ? (
            <Text style={[styles.text, {color: '#292929'}]}>{birth}</Text>
          ) : (
            <Text style={[styles.text]}>{placeholder}</Text>
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
