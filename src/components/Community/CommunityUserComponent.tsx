import common from '@styles/common';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {iconPath} from '@util/iconPath';
import {BLUE} from '@styles/colors';

type UserProps = {
  data: {
    id: number;
    image: any;
    nickname: string;
    certified: boolean;
    field: string;
    career: string;
    job: () => void;
  };
};

function CommunityUserComponent({writerInfo}: any) {
  return (
    <View style={common.row}>
      <Image
        source={
          writerInfo?.profileImage
            ? {uri: writerInfo?.profileImage.originFileUrl}
            : iconPath.THUMBNAIL
        }
        style={[common.thumbnail, common.mr8]}
      />
      <View>
        <View style={common.rowCenter}>
          <Text style={[common.text_m, common.fwb, common.mr8]}>
            {writerInfo?.nickname ? writerInfo?.nickname : writerInfo?.name}
          </Text>
          {writerInfo?.type === 'INSTRUCTOR' ? (
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
          ) : writerInfo?.type === 'COMPANY' ? (
            <View>
              <View style={common.rowCenter}>
                <Text>센터</Text>
              </View>
            </View>
          ) : null}
        </View>
        <View style={common.row}>
          <Text style={[common.text_m, common.fwb, common.mr4]}>
            {writerInfo?.type === 'COMPANY'
              ? writerInfo?.company.field
              : writerInfo?.field}
          </Text>
          <Text style={[common.text, {alignSelf: 'flex-end'}]}>
            {writerInfo?.career}
          </Text>
        </View>
      </View>
      <Pressable
        style={styles.kebabIcon}
        hitSlop={10}
        onPress={writerInfo?.job}>
        <Image source={iconPath.KEBAB} style={[common.size24]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default CommunityUserComponent;
