import { RecruitForm } from '@/components/Form/RecruitForm';
import { ROUTE } from '@/lib/constants/route';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoggedInParamList } from '../../AppInner';

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.RECRUIT.EDIT>;

export const RecruitEditScreen = ({ route }: Props) => {
  return <RecruitForm mode="edit" recruitId={route.params.recruitId} />;
};
