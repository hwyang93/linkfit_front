import { FlatList, FlatListProps } from 'react-native';

interface AppFlatListProps extends FlatListProps<{ key: string; value: string }> {}

export const AppFlatList: React.FC<AppFlatListProps> = ({ ...props }) => {
  return <FlatList {...props} />;
};
