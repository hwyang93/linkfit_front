import {GRAY, INPUT} from '@styles/colors';
import common from '@styles/common';
import moment from 'moment';
import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface DatePickerProps {
  label: string;
  placeholder: string;
  onSelectDate: Function;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  placeholder,
  onSelectDate,
}) => {
  const [focus, setFocus] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');

  const showDatePicker = () => {
    setFocus(true);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setFocus(false);
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setDate(moment(date).format('YYYY.MM.DD'));
    onSelectDate(date);
    hideDatePicker();
  };

  return (
    <View>
      <View style={[common.inputWrapper]}>
        <Text style={[common.label, {color: focus ? INPUT.FOCUS : GRAY.LIGHT}]}>
          {label}
        </Text>
        <Pressable
          style={[common.textInput, focus && {borderColor: INPUT.FOCUS}]}
          onPress={showDatePicker}>
          {date ? (
            <Text style={[styles.text, {color: '#292929'}]}>{date}</Text>
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
        // display={'spinner'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: GRAY.DEFAULT,
    fontSize: 16,
  },
});

export default DatePicker;
