import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {GRAY} from '@styles/colors';
import CenterComponent from '@components/CenterComponent';
import hairlineWidth = StyleSheet.hairlineWidth;

function FollowingCenterComponent() {
  const CENTER = [
    {
      image: '',
      title: '',
      field: '',
      location: '',
      phoneNumber: '',
      message: '',
      favorite: '',
    },
  ];
  return (
    <ScrollView>
      <View style={styles.followingBox}>
        <Image
          source={require('../../assets/images/center_01.png')}
          style={styles.thumbnail}
        />

        <View>
          <CenterComponent />
        </View>
      </View>

      <View style={styles.followingBox}>
        <Image
          source={require('../../assets/images/center_01.png')}
          style={styles.thumbnail}
        />

        <View>
          <CenterComponent />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  followingBox: {
    paddingVertical: 16,
    borderBottomWidth: hairlineWidth,
    borderColor: GRAY.DEFAULT,
  },
  thumbnail: {marginBottom: 16, width: '100%', height: 160, borderRadius: 8},
  kebabIcon: {position: 'absolute', top: 16, right: 0},
});

export default FollowingCenterComponent;
