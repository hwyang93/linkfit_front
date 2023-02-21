import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {WHITE} from '@styles/colors';

import common from '@styles/common';
import {iconPath} from '@util/iconPath';

function ApplicantFinishComponent() {
  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={common.basicBox}>
          <View style={[common.rowCenter, common.mb8]}>
            <Text style={[common.text_s, common.fcg]}>2012.12.09 작성</Text>
            <Text style={[common.text_s, common.fcg, common.mh8]}>|</Text>
            <Text style={[common.text_s, common.fcg]}>대기중</Text>
          </View>
          <View style={common.rowCenter}>
            <Image
              source={iconPath.THUMBNAIL}
              style={[common.thumbnail, common.mr12]}
            />
            <Text style={common.title} numberOfLines={1}>
              이력서 제목
            </Text>
          </View>
          <Pressable
            style={styles.kebabIcon}
            hitSlop={10}
            onPress={() => Alert.alert('text', '케밥 클릭')}>
            <Image source={iconPath.KEBAB} style={[common.KEBAB]} />
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },

  kebabIcon: {position: 'absolute', top: 16, right: 16},
});

export default ApplicantFinishComponent;
