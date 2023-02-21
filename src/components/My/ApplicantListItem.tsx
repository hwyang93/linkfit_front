import common from '@styles/common';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {iconPath} from '@util/iconPath';
import {WHITE} from '@styles/colors';

function ApplicantListItem({data}: any) {
  return (
    <View>
      {data.map((item: any, index: number) => {
        return (
          <Pressable
            key={index}
            style={[common.basicBox, common.mb8]}
            onPress={item.job}>
            <View style={[common.rowCenter, common.mb8]}>
              <Text style={[common.text_s, common.fcg]}>{item.date}</Text>
              <Text style={[common.text_s, common.fcg, common.mh8]}>|</Text>
              <Text style={[common.text_s, common.fcg]}>{item.status}</Text>
            </View>
            <View style={common.rowCenter}>
              <Image
                source={iconPath.THUMBNAIL}
                style={[common.thumbnail, common.mr12]}
              />
              <Text style={common.title} numberOfLines={1}>
                {item.title}
              </Text>
            </View>
            <Pressable
              style={styles.kebabIcon}
              hitSlop={10}
              onPress={item.kebab}>
              <Image source={iconPath.KEBAB} style={[common.KEBAB]} />
            </Pressable>
          </Pressable>
        );
      })}
    </View>
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

export default ApplicantListItem;
