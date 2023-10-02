import { ReviewForm } from '@/components/Review/ReviewForm';
import { ROUTE } from '@/lib/constants/route';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoggedInParamList } from '../../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.REVIEW_EDIT>;

export const ReviewEditScreen = ({ route }: Props) => {
  return <ReviewForm mode="update" reviewId={route.params.reviewId} />;
};
