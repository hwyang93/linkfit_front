import { createRecruitBookmark, deleteRecruitBookmark } from '@/api/recruit';
import toast from '@/hooks/toast';
import { SCREEN_WIDTH } from '@/lib/constants/common';
import { iconPath } from '@/lib/iconPath';
import common from '@styles/common';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const imageSize = (SCREEN_WIDTH - 40) / 2;

// TODO: 북마크 클릭 로직 밖으로 분리

interface RecruitListItemProps {
  seq: number;
  position: string;
  title: string;
  companyName: string;
  address: string;
  bookmarkChecked: boolean;
  imageSrc?: string;
  onPress?: () => void;
}

const RecruitListItem: React.FC<RecruitListItemProps> = ({
  seq,
  position,
  title,
  companyName,
  address,
  bookmarkChecked,
  imageSrc,
  onPress,
}) => {
  const [isBookmarkChecked, setIsBookmarkChecked] = useState(bookmarkChecked);

  const handleBookmarkPress = () => {
    if (!isBookmarkChecked) {
      setIsBookmarkChecked(true);
      createRecruitBookmark(seq)
        .then(() => {
          toast.success({ message: '북마크 등록이 완료되었어요!' });
        })
        .catch((error) => {
          toast.error({ message: error.message });
        });
    } else {
      setIsBookmarkChecked(false);
      deleteRecruitBookmark(seq)
        .then(() => {
          toast.success({ message: '북마크가 삭제되었어요!' });
        })
        .catch((error) => {
          toast.error({ message: error.message });
        });
    }
  };

  return (
    <Pressable style={styles.slideBox} onPress={onPress}>
      <View>
        <Image
          source={imageSrc ? { uri: imageSrc } : iconPath.CENTER_DEFAULT}
          style={styles.imgBox}
          resizeMode={'cover'}
        />
      </View>
      <View style={styles.infoBox}>
        <Text style={[common.text_m, common.fwb]}>{position}</Text>
        <Text style={[common.text_s, common.fwb]}>{title}</Text>
        <Text style={[common.text_s, common.fwb]}>{companyName}</Text>
        <Text style={[common.text_s, common.fcg]}>{address}</Text>
        <Pressable style={styles.bookmark} onPress={handleBookmarkPress}>
          <Image
            source={isBookmarkChecked ? iconPath.BOOKMARK_ON : iconPath.BOOKMARK}
            style={[common.size24]}
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  slideBox: {
    width: imageSize,
    marginRight: 8,
  },
  imgBox: {
    marginBottom: 8,
    width: imageSize,
    height: 104,
    borderRadius: 8,
  },
  infoBox: { position: 'relative' },
  bookmark: { position: 'absolute', top: 0, right: 0 },
});

export default RecruitListItem;
