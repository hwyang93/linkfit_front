import {Pressable} from 'react-native';
import Input from '@components/Input';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useState} from 'react';

type Props = {
  label: string;
  placeholder: string;
};

function DatePicker({label, placeholder}: Props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: any) => {
    setStart(moment(date).format('YYYY.MM'));

    hideDatePicker();
  };

  return (
    <Pressable onPress={showDatePicker}>
      <Input
        pointerEvents={'none'}
        label={label}
        value={start}
        placeholder={placeholder}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}

export default DatePicker;
