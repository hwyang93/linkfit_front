import {Provider} from 'react-redux';
import store from './src/store';
import AppInner from './AppInner';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';
import usePermissions from '@util/usePermissions';

function App() {
  usePermissions();
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
