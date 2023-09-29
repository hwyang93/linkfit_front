import { SCREEN_WIDTH } from '@/lib/constants/common';
import DatePicker from '@components/DatePicker';
import SelectBox from '@components/SelectBox';
import common from '@styles/common';
import { View } from 'react-native';
const columns2 = (SCREEN_WIDTH - 40) / 2;

const CAREER_DATA = ['필라테스', '요가'];
const WORK_DATA = ['정규직', '계약직'];

interface CareerComponentProps {
  onSelectPosition: Function;
  onSelectWorkType: Function;
  onSelectStartDate: Function;
  onSelectEndDate: Function;
}

const CareerComponent: React.FC<CareerComponentProps> = ({
  onSelectStartDate,
  onSelectEndDate,
  onSelectWorkType,
  onSelectPosition,
}) => {
  return (
    <>
      {/* 경력 */}
      <View style={common.mb16}>
        <SelectBox
          label={'경력'}
          data={CAREER_DATA}
          onSelect={(value: any) => onSelectPosition(value)}
          defaultButtonText={'포지션을 선택하세요. (ex. 필라테스)'}
        />
      </View>

      {/* 근무 형태 */}
      <View style={common.mb16}>
        <SelectBox
          label={'근무 형태'}
          data={WORK_DATA}
          onSelect={(value: any) => onSelectWorkType(value)}
          defaultButtonText={'근무 형태를 선택하세요.'}
        />
      </View>

      {/* 입사일 퇴사일 */}
      <View style={common.mb16}>
        <View style={common.row}>
          <View style={[common.mr8, { width: columns2 }]}>
            <DatePicker label={'입사'} placeholder={'입사 날짜'} onSelectDate={onSelectStartDate} />
          </View>

          <View style={{ width: columns2 }}>
            <DatePicker label={'퇴사'} placeholder={'퇴사 날짜'} onSelectDate={onSelectEndDate} />
          </View>
        </View>
      </View>
    </>
  );
};

export default CareerComponent;
