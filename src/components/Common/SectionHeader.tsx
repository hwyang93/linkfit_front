import common from '@/styles/common';
import React from 'react';
import {
  Pressable,
  StyleProp,
  Text,
  TextProps,
  View,
  ViewStyle,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface SectionHeaderProps extends TextProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onPress,
  style,
  ...props
}) => {
  return (
    <Pressable
      style={[common.rowCenterBetween, style]}
      onPress={onPress}
      {...props}>
      <Text style={common.title_s}>{title}</Text>
      {onPress && (
        <View>
          <FontAwesome name="chevron-right" color="black" />
        </View>
      )}
    </Pressable>
  );
};

export default SectionHeader;
