import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import {INPUT} from '@styles/colors';
import {useState} from 'react';

type selectProps = {
  data: object;
};

const SelectBox = ({data}: selectProps) => {
  const [focus, setFocus] = useState(false);
  return (
    <SelectDropdown
      data={data}
      onSelect={selectedItem => {
        setAgency(selectedItem);
        console.log('selected : ', selectedItem);
      }}
      buttonTextAfterSelection={selectedItem => {
        return selectedItem;
      }}
      rowTextForSelection={item => {
        return item;
      }}
      defaultButtonText={'통신사'}
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
  );
};

const styles = StyleSheet.create({
  selectBox: {
    width: '100%',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: INPUT.DEFAULT,
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
