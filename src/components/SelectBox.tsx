import { iconPath } from '@/lib/iconPath';
import { GRAY, INPUT } from '@styles/colors';
import common from '@styles/common';
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface SelectBoxProps {
  data: any;
  defaultButtonText: string;
  label?: string;
  textAlign?: string;
  icon?: string;
  selectKey?: string;
  onSelect: (value: string, index: number) => void;
  onChangeSearchInputText?: () => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  data,
  defaultButtonText,
  label,
  textAlign,
  icon,
  selectKey,
  onSelect,
  onChangeSearchInputText,
}) => {
  const [focus, setFocus] = useState(false);
  const [, setSelectItem] = useState('');

  const selectHandler = (value: any, index: number) => {
    if (selectKey === 'index') {
      onSelect(value, index);
    }
    onSelect(value, index);
    setSelectItem(value);
  };

  return (
    <View>
      <SelectDropdown
        data={data}
        onSelect={(selectedItem, index) => {
          selectHandler(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem) => selectedItem}
        rowTextForSelection={(item) => item}
        defaultButtonText={defaultButtonText}
        // buttonStyle={{width: '100%', backgroundColor: WHITE}}
        buttonStyle={focus ? styles.selectBoxFocus : styles.selectBox}
        // buttonTextStyle={focus ? styles.selectTextFocus : styles.selectText}
        renderCustomizedButtonChild={(selectedItem) => {
          return (
            <View style={[common.rowCenter, { height: 56, width: '100%' }]}>
              {icon === 'time' && (
                <View
                  style={{
                    position: 'absolute',
                    left: 8,
                    top: 16,
                  }}>
                  <Image source={iconPath.TIME} style={[common.size24]} />
                </View>
              )}
              <Text
                style={[
                  focus ? styles.selectTextFocus : styles.selectText,
                  textAlign === 'right' && {
                    width: '100%',
                    textAlign: 'right',
                    paddingRight: 16,
                  },
                ]}>
                {selectedItem ? selectedItem : defaultButtonText}
              </Text>
            </View>
          );
        }}
        renderDropdownIcon={(isOpened) => {
          return <FontAwesome name="chevron-down" color="#acacac" size={14} />;
        }}
        dropdownIconPosition="right"
        dropdownStyle={styles.dropBox}
        rowStyle={styles.dropItem}
        rowTextStyle={styles.dropText}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChangeSearchInputText={onChangeSearchInputText || (() => {})}
      />
      {label && (
        <Text style={[common.label, { color: focus ? INPUT.FOCUS : GRAY.LIGHT }]}>{label}</Text>
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
    paddingLeft: 8,
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
    paddingLeft: 8,
  },
  textRight: {
    color: '#292929',
    fontSize: 16,
    textAlign: 'right',
  },
  textLeft: {
    color: '#acacac',
    fontSize: 16,
  },
});

export default SelectBox;
