import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Alert, BackHandler } from 'react-native';

const useExitAlert = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      return navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        Alert.alert('잠시만요!', '앱을 종료하시겠습니까?', [
          {
            text: '취소',
            onPress: () => null,
          },
          { text: '확인', onPress: () => BackHandler.exitApp() },
        ]);
      });
    }, [navigation]),
  );
};

export default useExitAlert;
