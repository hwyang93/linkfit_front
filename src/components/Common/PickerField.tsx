import { GRAY, INPUT } from '@/styles/colors';
import common from '@/styles/common';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface PickerFieldProps {
  label: string;
  value: string;
  placeholder: string;
  focused?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export const PickerField = ({
  label,
  value,
  placeholder,
  focused = false,
  disabled = false,
  onPress,
}: PickerFieldProps) => {
  return (
    <View>
      <View style={common.inputWrapper}>
        {label ? (
          <Text style={[common.label, { color: focused ? INPUT.FOCUS : GRAY.LIGHT }]}>{label}</Text>
        ) : null}
        <Pressable
          style={[common.textInput, focused && { borderColor: INPUT.FOCUS }]}
          onPress={onPress}
          disabled={disabled}>
          {value ? (
            <Text style={[styles.text, { color: '#292929' }]}>{value}</Text>
          ) : (
            <Text style={styles.text}>{placeholder}</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: GRAY.DEFAULT,
    fontSize: 16,
  },
});
