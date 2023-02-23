import {Image, StyleSheet, Text, View} from 'react-native';
import common, {width} from '@styles/common';
import {iconPath} from '@util/iconPath';

function Logo() {
  return (
    <View style={styles.logoArea}>
      <View style={styles.logoBox}>
        <Image
          source={iconPath.LOGO_TEXT}
          style={styles.logoText}
          resizeMode={'cover'}
        />
        <Image
          source={iconPath.LOGO}
          style={styles.logoImage}
          resizeMode={'cover'}
        />
      </View>
      <Text style={[common.text_m, common.tac, common.mt20]}>
        당신의 커리어를 위한 여정에{'\n'} Linkfit이 함께 할게요.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoArea: {
    alignItems: 'center',
  },
  logoBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    width: +width * 200,
    marginBottom: 8,
  },
  logoImage: {
    width: +width * 200,
    height: 58,
  },
});

export default Logo;
