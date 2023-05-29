import BlockButton from '@components/BlockButton';
import EmptySet from '@components/EmptySet';
import {GRAY} from '@styles/colors';
import common from '@styles/common';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import hairlineWidth = StyleSheet.hairlineWidth;

const BLACKLIST = [
  {
    image: require('@images/center_01.png'),
    title: '링크 필라테스',
    field: '필라테스',
    location: '서울 · 송파구',
    phoneNumber: '',
    message: '',
    favorite: '',
    blocked: true,
  },
  {
    image: require('@images/center_02.png'),
    title: '링크 필라테스',
    field: '필라테스',
    location: '서울 · 송파구',
    phoneNumber: '',
    message: '',
    favorite: '',
    blocked: true,
  },
];

const BlockCenterComponent: React.FC = () => {
  // const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const onBlock = () => {};

  return (
    <>
      {BLACKLIST.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {BLACKLIST.map((item, index) => {
            return (
              <View key={index} style={styles.listBox}>
                {/* TODO: CenterInfo 스크린 퍼러미터로 memberSeq이 필요함 */}
                <Pressable onPress={() => {}}>
                  <View style={common.mb16}>
                    <Image
                      source={item.image}
                      resizeMode={'cover'}
                      style={common.imgBox}
                    />
                  </View>
                  <Text style={common.title}>{item.title}</Text>
                  <View style={common.row}>
                    <Text style={[common.text_s, common.fcg]}>
                      {item.field}
                    </Text>
                    <Text style={[common.text_s, common.fcg, common.mh8]}>
                      |
                    </Text>
                    <Text style={[common.text_s, common.fcg]}>
                      {item.location}
                    </Text>
                  </View>
                  {/* block true = 차단중, block false = 차단하기  */}
                  <BlockButton
                    title={'차단중'}
                    job={onBlock}
                    bottom={0}
                    right={0}
                  />
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <EmptySet text={'차단 중인 센터가 없어요.'} />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  listBox: {
    paddingVertical: 16,
    borderBottomWidth: hairlineWidth,
    borderColor: GRAY.DEFAULT,
  },
  thumbnail: {marginBottom: 16, width: '100%', height: 160, borderRadius: 8},
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default BlockCenterComponent;
