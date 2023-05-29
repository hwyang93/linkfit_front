import usePermissions from '@/utils/usePermissions';
import Toast from '@components/Toast';
import {NavigationContainer} from '@react-navigation/native';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import AppInner from './AppInner';
import store from './src/store';

const App = () => {
  usePermissions();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <Toast />
      <NavigationContainer>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
