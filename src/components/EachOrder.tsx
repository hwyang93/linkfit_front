import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import orderSlice, {Order} from '../slices/order';
import {useAppDispatch} from '../store';
import axios, {AxiosError} from 'axios';
// import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';
import {RootState} from '../store/reducer';
// import NaverMapView, {Marker, Path} from 'react-native-nmap/index';

function EachOrder({item}: {item: Order}) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(false);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const {start, end} = item;

  const toggleDetail = useCallback(() => {
    setDetail(prev => !prev);
  }, []);

  const onAccept = useCallback(async () => {
    try {
      setLoading(false);
      await axios.post(
        '',
        {orderId: item.orderId},
        {headers: {authorization: `Bearer ${accessToken}`}},
      );
      dispatch(orderSlice.actions.acceptOrder(item.orderId));
      setLoading(true);
      navigation.navigate('Delivery');
    } catch (error) {
      let errorResponse = (error as AxiosError<{message: string}>).response;
      if (errorResponse?.status === 400) {
        // 타인이 이미 수락한 경우
        Alert.alert('알림', errorResponse.data?.message);
        dispatch(orderSlice.actions.rejectOrder(item.orderId));
      }
      setLoading(true);
    }
    dispatch(orderSlice.actions.acceptOrder(item.orderId));
  }, [accessToken, navigation, dispatch, item.orderId]);
  const onReject = useCallback(() => {
    dispatch(orderSlice.actions.rejectOrder(item.orderId));
  }, [dispatch, item.orderId]);

  return (
    <View style={styles.orderContainer}>
      <Pressable onPress={toggleDetail} style={styles.info}>
        <Text style={styles.eachInfo}>
          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
        </Text>
        <Text>삼성동</Text>
        <Text>왕십리</Text>
      </Pressable>
      {detail && (
        <View>
          <View style={styles.buttonWrapper}>
            <Pressable
              onPress={onAccept}
              disabled={loading}
              style={styles.acceptButton}>
              <Text style={styles.buttonText}>수락</Text>
            </Pressable>
            <Pressable
              onPress={onReject}
              disabled={loading}
              style={styles.rejectButton}>
              <Text style={styles.buttonText}>거절</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  orderContainer: {
    borderRadius: 5,
    margin: 5,
    padding: 10,
    backgroundColor: 'lightgray',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eachInfo: {
    // flex: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    flex: 1,
  },
  rejectButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EachOrder;
