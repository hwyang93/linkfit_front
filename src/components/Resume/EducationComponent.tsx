import {SCREEN_WIDTH} from '@/utils/constants/common';
import DatePicker from '@components/DatePicker';
import Input, {KeyboardTypes} from '@components/Input';
import SelectBox from '@components/SelectBox';
import common from '@styles/common';
import {useState} from 'react';
import {View} from 'react-native';

const columns2 = (SCREEN_WIDTH - 40) / 2;

interface EducationComponentProps {
  onSelectSchool: Function;
  onSelectMajor: Function;
  onSelectStartDate: Function;
  onSelectEndDate: Function;
  onSelectStatus: Function;
}

const EducationComponent: React.FC<EducationComponentProps> = ({
  onSelectSchool,
  onSelectMajor,
  onSelectStartDate,
  onSelectEndDate,
}) => {
  const [school, setSchool] = useState('');

  const educationData = ['고등학교 졸업', '대학교 졸업'];
  return (
    <>
      {/* 학력 */}
      <View style={common.mb16}>
        <SelectBox
          label={'학력'}
          data={educationData}
          onSelect={(value: any) => onSelectMajor(value)}
          defaultButtonText={'학력을 선택하세요.'}
        />
      </View>

      {/* 학교 명 */}
      <View style={common.mb16}>
        <Input
          label={'학교명'}
          onChangeText={(text: string) => {
            setSchool(text);
            onSelectSchool(text);
          }}
          value={school}
          placeholder={'학교명을 입력하세요.'}
          keyboardType={KeyboardTypes.DEFAULT}
        />
      </View>

      {/* 입학 일 졸업 일 */}
      <View style={common.mb16}>
        <View style={common.row}>
          <View style={[common.mr8, {width: columns2}]}>
            <DatePicker
              label={'입학'}
              placeholder={'입학 년월'}
              onSelectDate={onSelectStartDate}
            />
          </View>

          <View style={{width: columns2}}>
            <DatePicker
              label={'졸업'}
              placeholder={'졸업 년월'}
              onSelectDate={onSelectEndDate}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default EducationComponent;
