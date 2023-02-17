import common from '@styles/common';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
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
  };
};

function CommunityUserComponent({data}: UserProps) {
  return (
    <View style={common.row}>
      <Image source={data.image} style={[common.thumbnail, common.mr8]} />
      <View>
        <View style={common.rowCenter}>
          <Text style={[common.text_m, common.fwb, common.mr8]}>
            {data.nickname}
          </Text>
          {data.certified ? (
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
          ) : null}
        </View>
        <View style={common.row}>
          <Text style={[common.text_m, common.fwb, common.mr4]}>
            {data.field}
          </Text>
          <Text style={[common.text, {alignSelf: 'flex-end'}]}>
            {data.career}
          </Text>
        </View>
      </View>
      <Pressable
        style={styles.kebabIcon}
        hitSlop={10}
        onPress={() => Alert.alert('click', 'test')}>
        <Image source={iconPath.KEBAB} style={[common.KEBAB]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  kebabIcon: {position: 'absolute', top: 0, right: 0},
});

export default CommunityUserComponent;
