import FABContainer from '@components/Common/FABContainer';
import FloatingActionButton from '@/components/Common/FloatingActionButton';
import {iconPath} from '@/utils/iconPath';
import EmptySet from '@components/EmptySet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoggedInParamList} from '../../../AppInner';
import {useCallback, useEffect, useState} from 'react';
import {fetchInquiries} from '@api/inquiry';
import {isAxiosError} from 'axios';
import toast from '@hooks/toast';
import {FetchInquriyResponse} from '@/types/api/inquiry';
import {formatDate} from '@util/util';

const DATA = [
  {
    title: '문의 제목입니다.',
    date: '2023.01.30',
    finished: false,
  },
  {
    title: '문의를 했는데 문희가 어떻게 됨?',
    date: '2023.01.30',
    finished: true,
  },
];

type Props = NativeStackScreenProps<LoggedInParamList, 'Inquiry'>;

const InquiryScreen = ({navigation}: Props) => {
  const [inquiries, setInquiries] = useState<FetchInquriyResponse>([]);
  const toInquiry = () => {
    navigation.navigate('InquiryForm');
  };

  const getInquiries = useCallback(() => {
    fetchInquiries()
      .then(({data}) => {
        setInquiries(data);
      })
      .catch(error => {
        if (isAxiosError(error)) {
          toast.error({message: error.message});
        }
      });
  }, []);

  useEffect(() => {
    getInquiries();
  }, [getInquiries]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      {inquiries.length > 0 ? (
        <ScrollView>
          {inquiries.map((item, index) => {
            return (
              <Pressable key={index} style={common.mv16}>
                <View style={common.rowCenterBetween}>
                  <View style={[common.rowCenter, {width: '70%'}]}>
                    <Image
                      source={iconPath.INQUIRY}
                      style={[common.size24, common.mr8]}
                    />
                    <Text style={common.title} numberOfLines={1}>
                      {item.title}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.statusBox,
                      item.status === 'COMPLETE' && {borderColor: BLUE.DEFAULT},
                    ]}>
                    {item.status === 'COMPLETE' ? (
                      <Text
                        style={[
                          common.text,
                          common.fs10,
                          {color: BLUE.DEFAULT},
                        ]}>
                        답변완료
                      </Text>
                    ) : (
                      <Text style={[common.text, common.fs10]}>답변대기</Text>
                    )}
                  </View>
                </View>
                <Text style={common.text_m}>{formatDate(item.createdAt)}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      ) : (
        <EmptySet text={'등록된 문의 내역이 없어요.'} />
      )}
      <FABContainer>
        <FloatingActionButton
          iconSource={iconPath.LIST}
          label="문의하기"
          onPress={toInquiry}
        />
      </FABContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: WHITE},
  statusBox: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: GRAY.LIGHT,
  },
});

export default InquiryScreen;
