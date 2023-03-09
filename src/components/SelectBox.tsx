import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GRAY, INPUT, WHITE} from '@styles/colors';
import common from '@styles/common';

type selectProps = {
  data: any;
  onSelect: Function;
  defaultButtonText: string;
  label?: string;
};

const SelectBox = ({data, onSelect, defaultButtonText, label}: selectProps) => {
  const [focus, setFocus] = useState(false);
  const [, setSelectItem] = useState('');

  const selectHandler = (value: any) => {
    onSelect(value);
    setSelectItem(value);
  };

  return (
    <View>
      <SelectDropdown
        data={data}
        onSelect={selectedItem => {
          selectHandler(selectedItem);
        }}
        buttonTextAfterSelection={selectedItem => {
          return selectedItem;
        }}
        rowTextForSelection={item => {
          return item;
        }}
        defaultButtonText={defaultButtonText}
        // buttonStyle={{width: '100%', backgroundColor: WHITE}}
        buttonStyle={focus ? styles.selectBoxFocus : styles.selectBox}
        buttonTextStyle={focus ? styles.selectTextFocus : styles.selectText}
        renderDropdownIcon={isOpened => {
          return (
            <FontAwesome
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color={'#acacac'}
              size={16}
            />
          );
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={styles.dropBox}
        rowStyle={styles.dropItem}
        rowTextStyle={styles.dropText}
        onFocus={() => setFocus(true)}
      />
      {label && (
        <Text style={[common.label, {color: focus ? INPUT.FOCUS : GRAY.LIGHT}]}>
          {label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectBox: {
    width: '100%',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: GRAY.LIGHT,
  },
  selectText: {
    color: '#acacac',
    fontSize: 16,
    textAlign: 'left',
  },
  dropBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  dropItem: {
    borderBottomWidth: 1,
    borderBottomColor: INPUT.DEFAULT,
  },
  dropText: {},
  selectBoxFocus: {
    width: '100%',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: INPUT.FOCUS,
  },
  selectTextFocus: {
    color: '#292929',
    fontSize: 16,
    textAlign: 'left',
  },
});

export default SelectBox;
