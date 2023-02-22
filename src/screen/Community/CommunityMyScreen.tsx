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
import {iconPath} from '@util/iconPath';
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';
import CommunityMyScreenTabView from '@screen/Community/CommunityMyScreenTabView';

function CommunityMyScreen() {
  const [loading, setLoading] = useState<boolean>(false);
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
                  니넥임
                </Text>

                <View>
                  <View style={common.rowCenter}>
                    <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>
                      인증강사
                    </Text>
                    <Image
                      style={{marginLeft: 2, width: 14, height: 14}}
                      source={iconPath.CERTIFICATION}
                    />
                  </View>
                </View>
              </View>
              <View style={common.row}>
                <Text style={[common.text_m, common.fwb, common.mr4]}>
                  포지션
                </Text>
                <Text style={[common.text, {alignSelf: 'flex-end'}]}>3년</Text>
              </View>
              <Text style={[common.text_s, {color: GRAY.DARK}]}>
                서울 · 송파구
              </Text>
            </View>
            {/*<Pressable style={styles.kebabIcon} hitSlop={10}>*/}
            {/*  <Image source={iconPath.KEBAB} style={[common.KEBAB]} />*/}
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
