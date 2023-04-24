import {Dimensions, View} from 'react-native';
import common from '@styles/common';
import SelectBox from '@components/SelectBox';
import DatePicker from '@components/DatePicker';
import {useState} from 'react';

const windowWidth = Dimensions.get('window').width;
const columns2 = (windowWidth - 40) / 2;

type careerProps = {
  onSelectPosition: Function;
  onSelectWorkType: Function;
  onSelectStartDate: Function;
  onSelectEndDate: Function;
};

function CareerComponent({
  onSelectStartDate,
  onSelectEndDate,
  onSelectWorkType,
  onSelectPosition,
}: careerProps) {
  // const [career, setCareer] = useState('');
  // const [workType, setWorkType] = useState('');
  const careerData = ['필라테스', '요가'];
  const workData = ['정규직', '계약직'];
  return (
    <>
      {/* 경력 */}
      <View style={common.mb16}>
        <SelectBox
          label={'경력'}
          data={careerData}
          onSelect={(value: any) => onSelectPosition(value)}
          defaultButtonText={'포지션을 선택하세요. (ex. 필라테스)'}
        />
      </View>

      {/* 근무 형태 */}
      <View style={common.mb16}>
        <SelectBox
          label={'근무 형태'}
          data={workData}
          onSelect={(value: any) => onSelectWorkType(value)}
          defaultButtonText={'근무 형태를 선택하세요.'}
        />
      </View>

      {/* 입사일 퇴사일 */}
      <View style={common.mb16}>
        <View style={common.row}>
          <View style={[common.mr8, {width: columns2}]}>
            <DatePicker label={'입사'} placeholder={'입사 날짜'} />
          </View>

          <View style={{width: columns2}}>
            <DatePicker label={'퇴사'} placeholder={'퇴사 날짜'} />
          </View>
        </View>
      </View>
    </>
  );
}

export default CareerComponent;
