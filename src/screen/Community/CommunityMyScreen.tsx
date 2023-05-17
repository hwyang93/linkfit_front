import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {iconPath} from '@/utils/iconPath';
import LinearGradient from 'react-native-linear-gradient';
import {useCallback, useEffect, useState} from 'react';
import CommunityMyScreenTabView from '@screen/Community/CommunityMyScreenTabView';
import {fetchMemberInfo} from '@api/member';
import toast from '@hooks/toast';
import {fetchBookmarkCommunities, fetchCommunityPosts} from '@api/community';

function CommunityMyScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [memberInfo, setMemberInfo] = useState<any>({});

  const getMemberInfo = useCallback(() => {
    fetchMemberInfo()
      .then(({data}: any) => {
        setMemberInfo(data);
      })
      .catch((e: any) => {
        toast.error({message: e.message});
      });
  }, []);

  useEffect(() => {
    getMemberInfo();
  }, []);

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
                  {memberInfo.nickname ? memberInfo.nickname : memberInfo.name}
                </Text>

                <View>
                  {memberInfo.type === 'INSTRUCTOR' ? (
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
                        {memberInfo.type === 'COMPANY' ? '센터' : '일반인'}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={common.row}>
                <Text style={[common.text_m, common.fwb, common.mr4]}>
                  {memberInfo.type === 'COMPANY'
                    ? memberInfo.company.field
                    : memberInfo.field}
                </Text>
                <Text style={[common.text, {alignSelf: 'flex-end'}]}>
                  {memberInfo.career}
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

          {/* MY 프로필 수정하기 버튼 */}
          <View style={common.mt16}>
            <Pressable>
              <LinearGradient
                style={common.button}
                start={{x: 0.1, y: 0.5}}
                end={{x: 0.6, y: 1}}
                colors={['#74ebe4', '#3962f3']}>
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={common.buttonText}>MY 프로필 수정하기</Text>
                )}
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
      <CommunityMyScreenTabView />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default CommunityMyScreen;
