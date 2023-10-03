import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

interface AppSafeAreaViewProps extends SafeAreaViewProps {}

const AppSafeAreaView: React.FC<AppSafeAreaViewProps> = ({ children, ...props }) => {
  return (
    <SafeAreaView style={{ flex: 1 }} {...props}>
      {children}
    </SafeAreaView>
  );
};

export default AppSafeAreaView;
