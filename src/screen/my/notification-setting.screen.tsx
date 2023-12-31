import { LoggedInParamList } from '@/../AppInner';
import { ROUTE } from '@/lib/constants/route';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BLUE, GRAY, WHITE } from '@styles/colors';
import common from '@styles/common';
import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.NOTIFICATION_SETTING>;

export const NotificationSettingScreen = ({}: Props) => {
  const [isEnable, setIsEnable] = useState(false);
  const [visible, setVisible] = useState(false);
  const [startTime, setStartTime] = useState<any>('12:00');
  const [endTime, setEndTime] = useState<any>('12:00');

  const toggleSwitch = () => setIsEnable((previousState) => !previousState);

  const openTimePicker = () => {
    setVisible(true); // 모달 open
  };

  const onConfirm = () => {
    setVisible(false); // 모달 close
  };

  const onCancel = () => {
    // 취소 시
    setVisible(false); // 모달 close
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={[common.rowCenterBetween, { paddingVertical: 24 }]}>
          <Text style={common.text_m}>전체알림</Text>
          <Switch
            trackColor={{ false: '#dcdcdc', true: '#3962f3' }}
            thumbColor={isEnable ? '#fff' : '#fff'}
            ios_backgroundColor="#dcdcdc"
            onValueChange={toggleSwitch}
            value={isEnable}
          />
        </View>
      </View>
      <View style={styles.line} />
      <View>
        <View style={[common.rowCenterBetween, { paddingVertical: 24 }]}>
          <Text style={common.text_m}>커리어 알림</Text>
          <Switch
            trackColor={{ false: '#dcdcdc', true: '#3962f3' }}
            thumbColor={isEnable ? '#fff' : '#fff'}
            ios_backgroundColor="#dcdcdc"
            onValueChange={toggleSwitch}
            value={isEnable}
          />
        </View>
      </View>
      <View>
        <View style={[common.rowCenterBetween, { paddingVertical: 24 }]}>
          <Text style={common.text_m}>쪽지 알림</Text>
          <Switch
            trackColor={{ false: '#dcdcdc', true: '#3962f3' }}
            thumbColor={isEnable ? '#fff' : '#fff'}
            ios_backgroundColor="#dcdcdc"
            onValueChange={toggleSwitch}
            value={isEnable}
          />
        </View>
      </View>
      <View>
        <View style={[common.rowCenterBetween, { paddingVertical: 24 }]}>
          <Text style={common.text_m}>활동 알림</Text>
          <Switch
            trackColor={{ false: '#dcdcdc', true: '#3962f3' }}
            thumbColor={isEnable ? '#fff' : '#fff'}
            ios_backgroundColor="#dcdcdc"
            onValueChange={toggleSwitch}
            value={isEnable}
          />
        </View>
      </View>
      <View style={styles.line} />

      <View>
        <View style={[common.rowCenterBetween, { paddingVertical: 24 }]}>
          <Text style={common.text_m}>방해금지 설정</Text>
          <Switch
            trackColor={{ false: '#dcdcdc', true: '#3962f3' }}
            thumbColor={isEnable ? '#fff' : '#fff'}
            ios_backgroundColor="#dcdcdc"
            onValueChange={toggleSwitch}
            value={isEnable}
          />
        </View>
        <View style={[common.rowCenterBetween, common.mb16]}>
          <Text style={common.text_m}>시작 시간</Text>
          <Pressable onPress={openTimePicker}>
            <Text style={[common.text_m, styles.time]}>{startTime}</Text>
          </Pressable>
        </View>
        <View style={[common.rowCenterBetween, common.mb16]}>
          <Text style={common.text_m}>종료 시간</Text>
          <Pressable onPress={openTimePicker}>
            <Text style={[common.text_m, styles.time]}>{endTime}</Text>
          </Pressable>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={visible}
        mode={'time'}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <DateTimePickerModal
        isVisible={visible}
        mode={'time'}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: WHITE, flex: 1, padding: 16 },
  line: { backgroundColor: GRAY.LIGHT, height: 1, width: '100%' },
  time: { color: BLUE.DEFAULT },
});
