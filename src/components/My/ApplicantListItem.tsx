import { iconPath } from '@/utils/iconPath';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import common from '@styles/common';
import { Image, Pressable, Text, View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

interface ApplicantListItemProps {
  applySeq: number;
  resumeSeq: number;
  recruitSeq: number;
  createdAt: string;
  status: string;
  resumeTitle?: string;
}

const ApplicantListItem: React.FC<ApplicantListItemProps> = ({
  applySeq,
  resumeSeq,
  recruitSeq,
  createdAt,
  status,
  resumeTitle,
}) => {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  return (
    <View>
      <Pressable
        style={[common.basicBox, common.mb8]}
        onPress={() => {
          navigation.navigate('ResumePreview', {
            resumeSeq: resumeSeq,
            applySeq: applySeq,
            recruitSeq: recruitSeq,
          });
        }}>
        <View style={[common.rowCenter, common.mb8]}>
          <Text style={[common.text_s, common.fcg]}>{createdAt}</Text>
          <Text style={[common.text_s, common.fcg, common.mh8]}>|</Text>
          <Text style={[common.text_s, common.fcb]}>{status}</Text>
        </View>
        <View style={common.rowCenter}>
          <Image source={iconPath.THUMBNAIL} style={[common.thumbnail, common.mr12]} />
          <Text style={common.title} numberOfLines={1}>
            {resumeTitle}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ApplicantListItem;
