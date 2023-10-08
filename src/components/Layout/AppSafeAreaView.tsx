import THEME from '@/styles/theme';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

interface AppSafeAreaViewProps extends SafeAreaViewProps {}

const AppSafeAreaView: React.FC<AppSafeAreaViewProps> = ({ children, style, ...props }) => {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: THEME.WHITE }, style]} {...props}>
      {children}
    </SafeAreaView>
  );
};

export default AppSafeAreaView;
