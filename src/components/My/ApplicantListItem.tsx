import common from '@styles/common';
import {Image, Pressable, Text, View} from 'react-native';
import {iconPath} from '@util/iconPath';

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
          </Pressable>
        );
      })}
    </View>
  );
}

export default ApplicantListItem;
