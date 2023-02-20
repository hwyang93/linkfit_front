import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {GRAY} from '@styles/colors';
import CenterInfoComponent from '@components/CenterInfoComponent';
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
        <View>
          <CenterInfoComponent />
        </View>
      </View>

      <View style={styles.followingBox}>
        <View>
          <CenterInfoComponent />
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
