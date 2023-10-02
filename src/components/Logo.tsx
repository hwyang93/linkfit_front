import { iconPath } from '@/lib/iconPath';
import common, { width } from '@styles/common';
import { Image, StyleSheet, Text, View } from 'react-native';

const Logo: React.FC = () => {
  return (
    <View style={styles.logoArea}>
      <View style={styles.logoBox}>
        <Image source={iconPath.LOGO_TEXT} style={styles.logoText} resizeMode={'cover'} />
        <Image source={iconPath.LOGO} style={styles.logoImage} resizeMode={'cover'} />
      </View>
      <Text style={[common.text_m, common.tac, common.mt20]}>
        당신의 커리어를 위한 여정에{'\n'} Linkfit이 함께 할게요.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoArea: {
    alignItems: 'center',
  },
  logoBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    height: 58,
    width: +width * 200,
  },
  logoText: {
    marginBottom: 8,
    width: +width * 200,
  },
});

export default Logo;
