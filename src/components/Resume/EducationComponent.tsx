import {Dimensions, View} from 'react-native';
import common from '@styles/common';
import SelectBox from '@components/SelectBox';
import Input, {KeyboardTypes} from '@components/Input';
import DatePicker from '@components/DatePicker';
import {useState} from 'react';

const windowWidth = Dimensions.get('window').width;
const columns2 = (windowWidth - 40) / 2;

type educationProps = {
  onSelectSchool: Function;
  onSelectMajor: Function;
  onSelectStartDate: Function;
  onSelectEndDate: Function;
  onSelectStatus: Function;
};

function EducationComponent({
  onSelectSchool,
  onSelectMajor,
  onSelectStartDate,
  onSelectEndDate,
  onSelectStatus,
}: educationProps) {
  const [school, setSchool] = useState('');
  const [education, setEducation] = useState('');
  console.log('rendering');
  const educationData = ['고등학교 졸업', '대학교 졸업'];
  return (
    <>
      {/* 학력 */}
      <View style={common.mb16}>
        <SelectBox
          label={'학력'}
          data={educationData}
          onSelect={(value: any) => setEducation(value)}
          defaultButtonText={'학력을 선택하세요.'}
        />
      </View>

      {/* 학교 명 */}
      <View style={common.mb16}>
        <Input
          label={'학교명'}
          onChangeText={(text: string) => onSelectSchool(text)}
          value={school}
          placeholder={'학교명을 입력하세요.'}
          keyboardType={KeyboardTypes.DEFAULT}
        />
      </View>

      {/* 입학 일 졸업 일 */}
      <View style={common.mb16}>
        <View style={common.row}>
          <View style={[common.mr8, {width: columns2}]}>
            <DatePicker label={'입학'} placeholder={'입학 년월'} />
          </View>

          <View style={{width: columns2}}>
            <DatePicker label={'졸업'} placeholder={'졸업 년월'} />
          </View>
        </View>
      </View>
    </>
  );
}

export default EducationComponent;
