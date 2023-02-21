import {Pressable} from 'react-native';
import Input from '@components/Input';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useState} from 'react';

function BirthdayPicker() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birth, setBirth] = useState('');
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: any) => {
    setBirth(moment(date).format('YYYY.MM.DD'));
    // console.log('생일', birthday);
    hideDatePicker();
  };

  return (
    <Pressable onPress={showDatePicker}>
      <Input
        pointerEvents={'none'}
        label={'생년월일'}
        value={birth}
        placeholder={'생년월일을 선택 하세요.'}
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

export default BirthdayPicker;
