import {iconPath} from '@/utils/iconPath';
import BlockButton from '@components/BlockButton';
import EmptySet from '@components/EmptySet';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';

const BLACKLIST = [
  {
    image: iconPath.THUMBNAIL,
    field: '필라테스',
    nickname: '둘리엄마',
    career: '3년',
    date: '2022.12.12',
    location: '의왕동',
    blocked: true,
  },
  {
    image: iconPath.THUMBNAIL,
    field: '요가',
    nickname: '둘리아빠',
    career: '3년',
    date: '2022.12.12',
    location: '능평동',
    blocked: true,
  },
];

const BlockInstructorComponent: React.FC = () => {
  const onBlock = () => {};
  return (
    <>
      {BLACKLIST.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {BLACKLIST.map((item, index) => {
            return (
              <View key={index} style={styles.listBox}>
                <View style={common.rowCenter}>
                  <Image source={item.image} style={styles.thumbnail} />
                  <View style={{flex: 1}}>
                    <View style={common.rowCenter}>
                      <Text style={[common.text_m, common.fwb, common.mr8]}>
                        {item.field}
                      </Text>
                      <Text style={[common.text]}>{item.career}</Text>
                    </View>
                    <View style={common.rowCenter}>
                      <Text style={[common.text_l, common.fwb, common.mr8]}>
                        {item.nickname}
                      </Text>
                      <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>
                        인증강사
                      </Text>
                      <Image
                        style={{marginLeft: 2, width: 14, height: 14}}
                        source={iconPath.CERTIFICATION}
                      />
                    </View>
                    <View style={[common.rowCenterBetween]}>
                      <Text style={[common.text_s, common.fcg, {flex: 1}]}>
                        {item.location}
                      </Text>
                      {/* 차단 버튼 */}
                      <View style={common.mt20}>
                        <BlockButton
                          title={'차단중'}
                          job={onBlock}
                          bottom={0}
                          right={0}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <EmptySet text={'차단 중인 강사가 없어요.'} />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: WHITE},
  listBox: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: GRAY.DEFAULT,
  },
  thumbnail: {marginRight: 12, width: 80, height: 80},
  kebabIcon: {position: 'absolute', top: 16, right: 0},
  blockButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default BlockInstructorComponent;
