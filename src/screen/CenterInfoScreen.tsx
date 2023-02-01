import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import common from '@styles/common';
import {GRAY, WHITE} from '@styles/colors';
import LinkCollection from '@components/LinkCollection';
import {iconPath} from '@util/iconPath';
import {useState} from 'react';

function CenterInfoScreen() {
  // todo: 채용중 박스 클릭 시 구인 공고 JobPostScreen 으로 이동
  const [isOpen, setIsOpen] = useState(false);

  const moreLoad = () => {
    setIsOpen(!isOpen);
    // todo: 공고 더 불러오기
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={common.mb16}>
          <Image
            source={require('../assets/images/center_01.png')}
            resizeMode={'cover'}
            style={styles.imgBox}
          />
        </View>

        <View style={[common.rowBetween, common.mb16]}>
          <View style={common.rowCenter}>
            <Text style={[common.title_l, common.mr8]}>링크 필라테스</Text>
            <Text style={[common.text, {alignSelf: 'flex-start'}]}>
              필라테스
            </Text>
          </View>
          {/*링크 영역 */}
          <LinkCollection />
        </View>
        <View style={common.row}>
          <Text style={[common.text_s, styles.tag]}>#Tag</Text>
          <Text style={[common.text_s, styles.tag]}>#Tag</Text>
        </View>

        <View style={common.mt40}>
          <Text style={[common.text_m, common.fwb, common.mb8]}>채용 중</Text>

          <View style={styles.offer}>
            <Text style={[common.text_l, common.fwb]}>
              필라테스 강사님 모십니다.
            </Text>
            <Text style={[common.text_s, {color: GRAY.DARK}]}>
              파트 · 월,수,금 · 시간협의
            </Text>
            <Pressable
              onPress={() => Alert.alert('click', 'test')}
              style={styles.iconPosition}>
              <Image source={iconPath.BOOKMARK} style={common.BOOKMARK} />
            </Pressable>
          </View>

          <Pressable onPress={moreLoad} style={styles.moreButton}>
            <Text style={[common.text_m, common.tac, common.mr8]}>
              {isOpen ? '접기' : '더보기'}
            </Text>
            <Icon
              name={isOpen ? 'angle-up' : 'angle-down'}
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: WHITE,
  },
  imgBox: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  tagArea: {},
  tag: {marginRight: 8, color: GRAY.DARK},
  iconPosition: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  offer: {
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: GRAY.DEFAULT,
    borderRadius: 8,
  },
  moreButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: GRAY.DEFAULT,
    borderRadius: 8,
  },
});
export default CenterInfoScreen;
