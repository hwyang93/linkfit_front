import { ScrollView, ScrollViewProps } from 'react-native';

interface AppScrollViewProps extends ScrollViewProps {}

const AppScrollView: React.FC<AppScrollViewProps> = ({
  children,
  contentContainerStyle,
  ...props
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flex: 1, ...{ contentContainerStyle } }}
      {...props}>
      {children}
    </ScrollView>
  );
};

export default AppScrollView;
