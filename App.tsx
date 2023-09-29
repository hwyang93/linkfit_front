import { usePermission } from '@/hooks/use-permission';
import Toast from '@components/Toast';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import AppInner from './AppInner';
import store from './src/store';

const App = () => {
  usePermission();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
      },
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <Toast />
        <NavigationContainer>
          <AppInner />
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
