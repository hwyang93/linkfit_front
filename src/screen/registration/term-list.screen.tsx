import Checkbox from '@/components/Common/Checkbox';
import CTAButton from '@/components/Common/CTAButton';
import RowView from '@/components/Common/RowView';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { Term } from '@/types/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BLUE } from '@styles/colors';
import common from '@styles/common';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

const TERMS = [
  { id: 1, title: '14세 이상입니다.', required: true },
  { id: 2, type: 'privacy', title: '개인정보 수집 및 이용 동의', required: true },
  { id: 3, type: 'service', title: '서비스 이용약관 동의', required: true },
];

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.AUTH.TERM_LIST>;

// TODO: 필수항목 전체 동의, 필수 항목 체크 후 다음 버튼 동작, 보기 버튼 클릭 시 약관 확인

export const TermListScreen = ({ navigation, route }: Props) => {
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

  const handleTermDetailButtonPress = (type: Term) => {
    navigation.navigate(ROUTE.AUTH.TERM_DETAIL, { type });
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
            <TermListItem
              key={index}
              checked={checkedTermIds.includes(item.id)}
              required={item.required}
              text={item.title}
              type={item.type}
              showDetailButton={!!item.type}
              onPress={() => handleAgreeButtonPress(item.id)}
              onDetailButtonPress={() => handleTermDetailButtonPress(item.type as Term)}
            />
          ))}
          <TermListItem
            text="채용 소식, 컨텐츠, 이벤트 등 링크핏 맞춤 정보 받기"
            checked={false}
            onPress={() => {}}
          />
          <RowView style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <Checkbox style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 16, marginRight: 8 }}>이메일</Text>
            <Checkbox style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 16, marginRight: 8 }}>문자 메시지</Text>
            <Checkbox style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 16, marginRight: 8 }}>앱 푸시</Text>
          </RowView>
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

interface TermListItemProps {
  text: string;
  required?: boolean;
  showDetailButton?: boolean;
  checked: boolean;
  type?: string;
  onDetailButtonPress?: () => void;
  onPress: () => void;
}

const TermListItem: React.FC<TermListItemProps> = ({
  text,
  required,
  showDetailButton,
  checked,
  onDetailButtonPress,
  onPress,
}) => {
  return (
    <View style={styles.terms}>
      <Pressable style={styles.touchWrap} onPress={onPress}>
        <Checkbox checked={checked} pointerEvents="none" />
        <Text style={[common.text_m, common.ml8, { color: BLUE.DEFAULT }]}>
          {required && '(필수) '}
        </Text>
        <Text style={[common.text_m, { flex: showDetailButton ? undefined : 1 }]}>{text}</Text>
      </Pressable>
      {showDetailButton && (
        <Pressable style={styles.link} onPress={onDetailButtonPress}>
          <Text style={[common.text, common.mr8]}>보기</Text>
          <Image source={iconPath.CIRCLE_ARROW_RIGHT} style={common.CIRCLE_ARROW_RIGHT} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  divideLine: {
    backgroundColor: BLUE.DEFAULT,
    height: 1,
    marginVertical: 16,
    width: '100%',
  },
  link: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  terms: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  touchWrap: { alignItems: 'center', flexDirection: 'row' },
});
