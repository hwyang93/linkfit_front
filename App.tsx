import * as React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import AppInner from './AppInner';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
