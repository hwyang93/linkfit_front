import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

type TabProps = {
  data: [{value: string}];
  onSelect: Function;
};

const TabButton = ({data, onSelect}: TabProps) => {
  const [userOption, setUserOption] = useState('');

  const selectHandler = (value: any) => {
    onSelect(value);
    setUserOption(value);
  };

  return (
    <>
      <View style={styles.tabWrap}>
        {data.map(item => {
          return (
            <Pressable
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
      <Text>select option: {userOption}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  tabWrap: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#acacac',
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
