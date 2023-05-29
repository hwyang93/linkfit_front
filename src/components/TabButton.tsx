import {GRAY} from '@styles/colors';
import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface TabButtonProps {
  genderData: Array<any>;
  value: string;
  onSelect: Function;
}

const TabButton: React.FC<TabButtonProps> = ({genderData, onSelect}) => {
  const [userOption, setUserOption] = useState('');

  const selectHandler = (value: any) => {
    onSelect(value);
    setUserOption(value);
  };

  return (
    <View style={styles.tabWrap}>
      {genderData.map((item, index) => {
        return (
          <Pressable
            key={index}
            style={[
              styles.tabBox,
              item.value === userOption ? styles.selected : styles.unSelected,
            ]}
            onPress={() => selectHandler(item.value)}>
            <Text
              style={[
                styles.option,
                item.value === userOption && {color: '#fff'},
              ]}>
              {item.value}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: GRAY.LIGHT,
    backgroundColor: '#fff',
  },
  tabBox: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  unSelected: {
    backgroundColor: '#fff',
  },
  selected: {
    backgroundColor: '#3962f3',
  },
  option: {
    fontSize: 16,
    textAlign: 'center',
    color: '#acacac',
  },
});

export default TabButton;
