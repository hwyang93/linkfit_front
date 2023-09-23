import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

interface AppSafeAreaViewProps extends SafeAreaViewProps {}

const AppSafeAreaView: React.FC<AppSafeAreaViewProps> = ({ children }) => {
  return <SafeAreaView>{children}</SafeAreaView>;
};

export default AppSafeAreaView;
