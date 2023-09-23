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
      {leftContent ? leftContent : <View />}
      <Text style={{ fontSize: 20, textAlign: 'center' }}>{title}</Text>
      {rightContent ? rightContent : <View />}
    </RowView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Header;
