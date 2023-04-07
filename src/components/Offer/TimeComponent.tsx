import {View} from 'react-native';
import common from '@styles/common';
import BirthdayPicker from '@components/BirthdayPicker';
import SelectBox from '@components/SelectBox';
import {useState} from 'react';

function TimeComponent() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const TIME2 = ['오전', '오후', '전일', '시간 협의'];
  return (
    <View>
      <View style={common.mb16}>
        <BirthdayPicker
          label={'날짜'}
          onSelect={(value: any) => setDate(value)}
          placeholder={'날짜를 선택하세요.'}
          value={date}
          textAlign={'right'}
          icon={'day'}
        />
      </View>
      <View style={common.mb16}>
        <SelectBox
          label={'시간'}
          data={TIME2}
          onSelect={(value: any) => setTime(value)}
          defaultButtonText={'선택한 요일의 시간을 선택하세요.'}
          textAlign={'right'}
          icon={'time'}
        />
      </View>
    </View>
  );
}
export default TimeComponent;
