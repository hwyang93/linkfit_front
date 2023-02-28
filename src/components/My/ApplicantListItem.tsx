import common from '@styles/common';
import {Image, Pressable, Text, View} from 'react-native';
import {iconPath} from '@util/iconPath';
import {useEffect, useState} from 'react';

function ApplicantListItem({list}: any) {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    setApplications(list);
    console.log(list);
  }, [list]);
  return (
    <View>
      {applications?.map((application: any, index: number) => {
        return (
          <Pressable
            key={index}
            style={[common.basicBox, common.mb8]}
            onPress={() => {}}>
            <View style={[common.rowCenter, common.mb8]}>
              <Text style={[common.text_s, common.fcg]}>
                {application.createdAt}
              </Text>
              <Text style={[common.text_s, common.fcg, common.mh8]}>|</Text>
              <Text style={[common.text_s, common.fcg]}>
                {application.status}
              </Text>
            </View>
            <View style={common.rowCenter}>
              <Image
                source={iconPath.THUMBNAIL}
                style={[common.thumbnail, common.mr12]}
              />
              <Text style={common.title} numberOfLines={1}>
                {application.resume.title}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

export default ApplicantListItem;
