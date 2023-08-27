import {LoggedInParamList} from '@/../AppInner';
import CTAButton from '@/components/Common/CTAButton';
import {FetchMemberInfoResponse} from '@/types/api/member';
import {Member} from '@/types/common';
import {iconPath} from '@/utils/iconPath';
import {fetchMemberInfo} from '@api/member';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CommunityMyScreenTabView from '@screen/Community/CommunityMyScreenTabView';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

type Props = NativeStackScreenProps<LoggedInParamList, 'CommunityMy'>;

const CommunityMyScreen = ({}: Props) => {
  const [memberInfo, setMemberInfo] = useState<FetchMemberInfoResponse>();

  const getMemberInfo = useCallback(() => {
    fetchMemberInfo()
      .then(({data}) => {
        setMemberInfo(data);
      })
      .catch(error => {
        if (isAxiosError(error)) {
          toast.error({message: error.message});
        }
      });
  }, []);

  useEffect(() => {
    getMemberInfo();
  }, [getMemberInfo]);

  return (
    <>
      <View style={styles.container}>
        <View style={common.mb16}>
          <View style={common.row}>
            <Image
              source={iconPath.THUMBNAIL}
              style={[common.thumbnail, common.mr8, {width: 64, height: 64}]}
            />
            <View>
              <View style={common.rowCenter}>
                <Text style={[common.text_m, common.fwb, common.mr8]}>
                  {memberInfo?.nickname
                    ? memberInfo.nickname
                    : memberInfo?.name}
                </Text>
                <View>
                  {memberInfo?.type === Member.Instructor ? (
                    <View style={common.rowCenter}>
                      <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>
                        인증강사
                      </Text>
                      <Image
                        style={{marginLeft: 2, width: 14, height: 14}}
                        source={iconPath.CERTIFICATION}
                      />
                    </View>
                  ) : (
                    <View style={common.rowCenter}>
                      <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>
                        {memberInfo?.type === Member.Company
                          ? '센터'
                          : '일반인'}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={common.row}>
                <Text style={[common.text_m, common.fwb, common.mr4]}>
                  {memberInfo?.type === Member.Company
                    ? memberInfo?.company.field
                    : memberInfo?.field}
                </Text>
                <Text style={[common.text, {alignSelf: 'flex-end'}]}>
                  {memberInfo?.career}
                </Text>
              </View>
              <Text style={[common.text_s, {color: GRAY.DARK}]}>
                서울 · 송파구
              </Text>
            </View>
            {/*<Pressable style={styles.kebabIcon} hitSlop={10}>*/}
            {/*  <Image source={iconPath.KEBAB} style={[common.size24]} />*/}
            {/*</Pressable>*/}
          </View>
          <View style={common.mt16}>
            <CTAButton label="MY 프로필 수정하기" />
          </View>
        </View>
      </View>
      <CommunityMyScreenTabView />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: WHITE,
  },
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default CommunityMyScreen;
