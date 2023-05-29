import common from '@styles/common';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface BlockButtonProps {
  title: string;
  loading?: any;
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
  job: () => void;
}

const BlockButton: React.FC<BlockButtonProps> = ({
  title,
  loading,
  top,
  right,
  bottom,
  left,
  job,
}) => {
  return (
    <View>
      <Pressable
        onPress={job}
        style={{
          position: 'absolute',
          top: top,
          right: right,
          bottom: bottom,
          left: left,
        }}>
        <LinearGradient
          style={[common.button, {height: 40, paddingHorizontal: 24}]}
          start={{x: 0.1, y: 0.5}}
          end={{x: 0.6, y: 1}}
          colors={['#74ebe4', '#3962f3']}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={common.buttonText}>{title}</Text>
          )}
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default BlockButton;
