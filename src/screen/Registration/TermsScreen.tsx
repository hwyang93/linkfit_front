import CTAButton from '@/components/Common/CTAButton';
import Checkbox from '@/components/Common/Checkbox';
import { iconPath } from '@/utils/iconPath';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BLUE } from '@styles/colors';
import common from '@styles/common';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

const TERMS = [
  { id: 1, title: '개인정보 수집 및 이용 동의', required: true },
  { id: 2, title: '서비스 이용약관 동의', required: true },
  { id: 3, title: '위치정보 이용약관', required: true },
  { id: 4, title: '마케팅 수신 동의', required: false },
];

type Props = NativeStackScreenProps<LoggedInParamList, 'Terms'>;

// TODO: 필수항목 전체 동의, 필수 항목 체크 후 다음 버튼 동작, 보기 버튼 클릭 시 약관 확인

const TermsScreen = ({ navigation, route }: Props) => {
  const [checkedTermIds, setCheckedTermIds] = useState<number[]>([]);

  const requiredTerms = TERMS.filter((item) => item.required);

  const isAllRequiredCheckboxChecked = requiredTerms.every((item) =>
    checkedTermIds.includes(item.id),
  );

  const toggleAllRequiredCheckbox = () => {
    if (isAllRequiredCheckboxChecked) {
      setCheckedTermIds(
        checkedTermIds.filter((id) => !requiredTerms.map((item) => item.id).includes(id)),
      );
    } else {
      setCheckedTermIds((prev) => [...prev, ...requiredTerms.map((item) => item.id)]);
    }
  };

  const toggleCheckbox = (id: number) => {
    if (checkedTermIds.includes(id)) {
      setCheckedTermIds(checkedTermIds.filter((item) => item !== id));
    } else {
      setCheckedTermIds([...checkedTermIds, id]);
    }
  };

  const handleAgreeAllButtonPress = () => {
    toggleAllRequiredCheckbox();
  };

  const handleAgreeButtonPress = (id: number) => {
    toggleCheckbox(id);
  };

  const handleContinueButtonPress = () => {
    if (route.params.isCompany) {
      navigation.navigate('CompanySignUpForm', {
        email: route.params.email,
      });
    } else {
      navigation.navigate('SignUpForm', {
        email: route.params.email,
      });
    }
  };

  const handleTermDetailButtonPress = () => {
    navigation.navigate('TermDetail');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={common.text_l}>
          서비스 이용을 위해{'\n'}
          정책 및 약관을 확인해 주세요.
        </Text>
      </View>
      <View style={common.mt40}>
        <View>
          <TouchableOpacity
            style={[common.mr8, styles.touchWrap]}
            onPress={handleAgreeAllButtonPress}>
            <Checkbox checked={isAllRequiredCheckboxChecked} pointerEvents="none" />
            <Text style={[common.text_m, common.ml8]}>필수 항목 전체동의</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divideLine} />
        <View>
          {TERMS.map((item, index) => (
            <View key={index} style={styles.terms}>
              <TouchableOpacity
                style={styles.touchWrap}
                onPress={() => handleAgreeButtonPress(item.id)}>
                <Checkbox checked={checkedTermIds.includes(item.id)} pointerEvents="none" />
                <Text style={[common.text_m, common.ml8, { color: BLUE.DEFAULT }]}>
                  {item.required ? '(필수) ' : '(선택) '}
                </Text>
                <Text style={[common.text_m]}>{item.title}</Text>
              </TouchableOpacity>
              <Pressable style={[styles.link]} onPress={handleTermDetailButtonPress}>
                <Text style={[common.text, common.mr8]}>보기</Text>
                <Image source={iconPath.CIRCLE_ARROW_RIGHT} style={common.CIRCLE_ARROW_RIGHT} />
              </Pressable>
            </View>
          ))}
        </View>
        <View style={styles.divideLine} />
        <View>
          <Text style={common.text_s}>선택항목은 동의하지 않으셔도 서비스를 이용할 수 있어요.</Text>
          <View style={common.mt40}>
            <CTAButton
              label="다음"
              onPress={handleContinueButtonPress}
              disabled={!isAllRequiredCheckboxChecked}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  terms: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  touchWrap: { flexDirection: 'row', alignItems: 'center' },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divideLine: {
    marginVertical: 16,
    width: '100%',
    height: 1,
    backgroundColor: BLUE.DEFAULT,
  },
});

export default TermsScreen;
