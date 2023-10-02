import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RowView from '../Common/RowView';

interface HeaderProps {
  title: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, leftContent, rightContent }) => {
  return (
    <RowView style={styles.container}>
      {leftContent ? <View style={{ width: '25%' }}>{leftContent}</View> : <View />}
      <Text style={{ fontSize: 20, textAlign: 'center' }}>{title}</Text>
      {rightContent ? <View style={{ width: '25%' }}>{rightContent}</View> : <View />}
    </RowView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});

export default Header;
