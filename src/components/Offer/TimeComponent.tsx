import BirthdayPicker from '@components/BirthdayPicker';
import SelectBox from '@components/SelectBox';
import common from '@styles/common';
import { useState } from 'react';
import { View } from 'react-native';

const TIME2 = ['오전', '오후', '전일', '시간 협의'];

interface TimeComponentProps {
  onSelectDay: Function;
  onSelectTime: Function;
}

const TimeComponent: React.FC<TimeComponentProps> = ({ onSelectDay, onSelectTime }) => {
  const [day, setDay] = useState('');

  const onSelectDatePicker = (value: string) => {
    onSelectDay(value);
    setDay(value);
  };

  return (
    <View>
      <View style={common.mb16}>
        <BirthdayPicker
          label={'날짜'}
          onSelect={(value: any) => onSelectDatePicker(value)}
          placeholder={'날짜를 선택하세요.'}
          value={day}
          textAlign={'right'}
          icon={'day'}
        />
      </View>
      <View style={common.mb16}>
        <SelectBox
          label={'시간'}
          data={TIME2}
          onSelect={(value: any) => onSelectTime(value)}
          defaultButtonText={'선택한 요일의 시간을 선택하세요.'}
          textAlign={'right'}
          icon={'time'}
        />
      </View>
    </View>
  );
};
export default TimeComponent;
