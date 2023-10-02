import THEME from '@/styles/theme';
import { GRAY } from '@styles/colors';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface TabButtonProps {
  list: string[];
  value: string;
  initialValue?: string;
  onSelect: (value: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ list, initialValue, onSelect }) => {
  const [userOption, setUserOption] = useState(initialValue || list[0]);

  const handleSelect = (value: string) => {
    onSelect(value);
    setUserOption(value);
  };

  return (
    <View style={styles.tabWrap}>
      {list.map((item, index) => (
        <Pressable
          key={index}
          style={[styles.tabBox, item === userOption ? styles.selected : styles.unSelected]}
          onPress={() => handleSelect(item)}>
          <Text style={[styles.option, item === userOption && { color: THEME.WHITE }]}>{item}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    color: '#acacac',
    fontSize: 16,
    textAlign: 'center',
  },
  selected: {
    backgroundColor: '#3962f3',
  },
  tabBox: {
    alignItems: 'center',
    borderRadius: 6,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  tabWrap: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: GRAY.LIGHT,
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'space-between',
  },
  unSelected: {
    backgroundColor: '#fff',
  },
});

export default TabButton;
