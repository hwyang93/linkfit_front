import { useMemberFollow } from '@/hooks/member/use-member-follow';
import { useMemberUnfollow } from '@/hooks/member/use-member-unfollow';
import { iconPath } from '@/lib/iconPath';
import common from '@/styles/common';
import { useState } from 'react';
import { Image, Text } from 'react-native';
import IconButton from './Common/IconButton';
import RowView from './Common/RowView';

interface FollowIconButtonProps {
  memberId: number;
  isFollowing: boolean;
  followerCount?: number;
}

export const FollowToggleButton = ({
  isFollowing: initialIsFollowing,
  followerCount: initialFollowerCount,
  memberId,
}: FollowIconButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [followerCount, setFollowerCount] = useState(initialFollowerCount);

  const followMutation = useMemberFollow();
  const unfollowMutation = useMemberUnfollow();

  const onPress = () => {
    if (isFollowing) {
      setIsFollowing(false);
      followerCount && setFollowerCount(followerCount - 1);
      unfollowMutation.mutate(memberId);
    }

    if (!isFollowing) {
      setIsFollowing(true);
      followerCount && setFollowerCount(followerCount + 1);
      followMutation.mutate(memberId);
    }
  };

  return (
    <RowView style={{ alignItems: 'center' }}>
      <IconButton
        source={isFollowing ? iconPath.FAVORITE_FILL : iconPath.FAVORITE}
        onPress={onPress}>
        <Image source={iconPath.FAVORITE_FILL} style={[common.size24]} />
        {followerCount && (
          <Text style={[common.text_m, common.fwb, common.ml8]}>{followerCount}</Text>
        )}
      </IconButton>
    </RowView>
  );
};
