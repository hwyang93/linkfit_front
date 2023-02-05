import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {BLUE, GRAY} from '@styles/colors';
import {useState} from 'react';

function ProfileBox() {
  const [selectedTab, setSelectedTab] = useState('강사 소개');
  const tabItem = [{value: '강사 소개'}, {value: '강사 후기'}];

  const tabSelectHandler = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <View>
      <View style={styles.profileBox}>
        <View style={[common.mr16, styles.thumbnailBox]}>
          <Image source={iconPath.PILATES} style={styles.thumbnail} />
        </View>
        <View>
          <View style={common.rowCenter}>
            <Text style={[common.text_l, common.fwb, common.mr8]}>닉네임</Text>
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

          <View style={common.rowCenter}>
            <Text style={[common.text_m, common.fwb, common.mr8]}>
              필라테스
            </Text>
            <Text style={[common.text, {alignSelf: 'flex-end'}]}>3년</Text>
            <Text style={{marginHorizontal: 8}}>|</Text>
            <Text style={[common.text_s]}>서울 송파구</Text>
          </View>

          <View style={common.rowCenter}>
            <Pressable onPress={() => Alert.alert('click', 'test')}>
              <Image
                source={iconPath.FAVORITE}
                style={[common.size24, common.mr8]}
              />
            </Pressable>
            <Text style={[common.text_m, common.fwb, common.mr8]}>23</Text>
            <Text style={common.text}>3시간 전 접속</Text>
          </View>
        </View>
        <Pressable
          style={styles.kebabIcon}
          hitSlop={10}
          onPress={() => Alert.alert('click', 'test')}>
          <Image source={iconPath.KEBAB} style={[common.KEBAB]} />
        </Pressable>
      </View>

      <View style={common.mb16}>
        <Text style={[common.text_m, common.fwb, common.mb8]}>소개글</Text>
        <Text style={common.text_m}>
          안녕하세요. 3년차 필라테스 강사입니다.
        </Text>
      </View>

      {/*링크 영역 */}
      <View style={[styles.linkBox, common.mb20]}>
        <Text style={[common.text_m, common.fwb, common.mb8]}>링크</Text>
        <View style={[common.rowCenter, {justifyContent: 'space-around'}]}>
          <Pressable
            style={common.mh4}
            onPress={() => Alert.alert('알림', '클릭테스트에용')}>
            <Image source={iconPath.LINK_URL} style={[common.size24]} />
          </Pressable>
          <Pressable
            style={common.mh4}
            onPress={() => Alert.alert('알림', '클릭테스트에용')}>
            <Image source={iconPath.LINK_BLOG} style={[common.size24]} />
          </Pressable>
          <Pressable
            style={common.mh4}
            onPress={() => Alert.alert('알림', '클릭테스트에용')}>
            <Image source={iconPath.LINK_BRUNCH} style={[common.size24]} />
          </Pressable>
        </View>
      </View>

      <View style={styles.tabBox}>
        {tabItem.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={[
                {flex: 1},
                styles.tabItem,
                item.value === selectedTab
                  ? styles.selected
                  : styles.unSelected,
              ]}
              onPress={() => tabSelectHandler(item.value)}>
              <Text
                style={[
                  common.text_m,
                  common.tac,
                  styles.tabText,
                  item.value === selectedTab && {
                    color: BLUE.DEFAULT,
                    fontWeight: '700',
                  },
                ]}>
                {item.value}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={common.mt16}>
        <Text style={[common.text_m, common.fwb, common.mb8]}>포트폴리오</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  profileBox: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 16,
  },
  thumbnailBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: GRAY.LIGHT,
  },
  thumbnail: {width: '50%', height: '50%'},
  kebabIcon: {position: 'absolute', top: 0, right: 0},
  linkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tabBox: {
    flexDirection: 'row',
  },
  tabItem: {
    borderBottomWidth: 1,
    borderColor: GRAY.DEFAULT,
  },
  tabText: {
    paddingVertical: 16,
    color: GRAY.DEFAULT,
  },
  selected: {
    borderBottomWidth: 2,
    borderColor: BLUE.DEFAULT,
  },
  unSelected: {
    borderBottomWidth: 1,
    borderColor: GRAY.DEFAULT,
  },
});

export default ProfileBox;
