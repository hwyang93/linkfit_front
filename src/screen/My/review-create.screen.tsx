import { ReviewForm } from '@/components/Review/ReviewForm';
import { ROUTE } from '@/lib/constants/route';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoggedInParamList } from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.REVIEW_CREATE>;

export const ReviewCreateScreen = ({ navigation, route }: Props) => {
  return <ReviewForm mode="create" />;
};
