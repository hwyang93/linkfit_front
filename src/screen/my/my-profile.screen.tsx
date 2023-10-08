import { useMemberInfo } from '@/hooks/member/use-member-info';
import { usePortfolioList } from '@/hooks/member/use-portfolio-list';
import { SCREEN_WIDTH } from '@/lib/constants/common';
import { ROUTE } from '@/lib/constants/route';
import { iconPath } from '@/lib/iconPath';
import { materialTopTabNavigationOptions } from '@/lib/options/tab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BLUE, GRAY } from '@styles/colors';
import common from '@styles/common';
import React, { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LoggedInParamList } from '../../../AppInner';

const DUMMY_REVIEW_DATA = [
  {
    id: 1,
    nickname: '저팔계',
    type: '강사',
    date: '2022.12.12',
    review:
      '후기 내용 입니다. 저팔계지만 유연해요. 깜짝 놀랐어요. 오늘 점심은 뭐 먹을까요. 매일매일 고민해요. 왜 때문이죠.',
  },
  {
    id: 2,
    nickname: '소다늠',
    type: '강사',
    date: '2023.1.12',
    review: '젓가락이지만 유연해요. 깜짝 놀랐어요.',
  },
];

const Tab = createMaterialTopTabNavigator();

const width = SCREEN_WIDTH - 32;
const imageSize = (width - 6) / 3;

interface HeaderProps {
  memberId: number;
  profileImageOriginFileUrl?: string;
  nickname?: string;
  name?: string;
  field?: string;
  career?: string | null;
  address?: string;
  followerCount?: number;
  onPencilIconPress: () => void;
}

// TODO: 안드로이드에서 레이아웃이 깨지는 버그 수정
const Header: React.FC<HeaderProps> = ({
  memberId,
  profileImageOriginFileUrl,
  nickname,
  name,
  field,
  career,
  address,
  followerCount,
  onPencilIconPress,
}) => {
  return (
    <View style={styles.profileBox}>
      <View style={[styles.thumbnailBox, common.mr16]}>
        <Image
          source={
            profileImageOriginFileUrl ? { uri: profileImageOriginFileUrl } : iconPath.THUMBNAIL
          }
          style={common.thumbnail_l}
        />
      </View>
      <View>
        <View style={common.rowCenter}>
          <Text style={[common.text_l, common.fwb, common.mr8]}>{nickname ? nickname : name}</Text>
          <View style={common.rowCenter}>
            <Text style={[common.text_s, { color: BLUE.DEFAULT }]}>인증강사</Text>
            <Image
              style={{ marginLeft: 2, width: 14, height: 14 }}
              source={iconPath.CERTIFICATION}
            />
          </View>
        </View>

        <View style={common.rowCenter}>
          {field && <Text style={[common.text_m, common.fwb, common.mr8]}>{field}</Text>}
          <Text style={common.text}>{career}</Text>
          {address && (
            <>
              <Text style={common.mh8}>|</Text>
              <Text style={[common.text_s, common.fcg]}>{address}</Text>
            </>
          )}
        </View>

        <View style={common.rowCenter}>
          <Pressable>
            <Image source={iconPath.FAVORITE_FILL} style={[common.size24, common.mr8]} />
          </Pressable>
          <Text style={[common.text_m, common.fwb, common.mr8]}>{followerCount}</Text>
        </View>
      </View>
      <Pressable style={styles.pencil} onPress={onPencilIconPress}>
        <Image source={iconPath.PENCIL_B} style={common.size24} />
      </Pressable>
    </View>
  );
};

const MyIntroductionTabHeader: React.FC = () => {
  return (
    <View style={common.mb8}>
      <Text style={[common.text_m, common.fwb]}>포트폴리오</Text>
    </View>
  );
};

type ReviewTabItemProps = {
  nickname: string;
  type: string;
  date: string;
  review: string;
};

const ReviewTabItem: React.FC<ReviewTabItemProps> = ({ nickname, type, date, review }) => {
  const [textLine, setTextLine] = useState(2);

  const expandText = () => setTextLine(textLine === 2 ? 0 : 2);

  return (
    <>
      <View style={[common.row, common.mb8]}>
        <Text style={[common.text_m, common.fwb, common.fs18]}>{nickname}</Text>
        <Text style={[common.text, { alignSelf: 'flex-end', marginHorizontal: 4 }]}>{type}</Text>
        <Text style={[common.text, { alignSelf: 'flex-end' }]}>{date}</Text>
      </View>
      <Pressable onPress={expandText}>
        <Text style={common.text_m} numberOfLines={textLine}>
          {review}
        </Text>
      </Pressable>
    </>
  );
};

interface MyIntroductionTabItemProps {
  src: string;
  onPress?: () => void;
}

const MyIntroductionTabItem: React.FC<MyIntroductionTabItemProps> = ({ src, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Image
        source={{ uri: src }}
        resizeMode={'cover'}
        style={{
          width: imageSize,
          height: imageSize,
          margin: 1,
        }}
      />
    </Pressable>
  );
};

type Props = NativeStackScreenProps<LoggedInParamList, typeof ROUTE.MY.PROFILE>;

export const MyProfileScreen = ({ navigation }: Props) => {
  const memberInfoQury = useMemberInfo();
  const memberInfo = memberInfoQury.data;

  const portfolioListQuery = usePortfolioList();

  const MyIntroductionTab: React.FC = () => {
    return (
      <FlatList
        data={portfolioListQuery.data}
        numColumns={3}
        ListHeaderComponent={<MyIntroductionTabHeader />}
        style={{ padding: 16, backgroundColor: 'white' }}
        renderItem={({ item }) => (
          <MyIntroductionTabItem
            src={item.originFileUrl}
            // onPress={() => navigation.navigate('Gallery')}
          />
        )}
      />
    );
  };

  const ReviewTab: React.FC = () => {
    return (
      <FlatList
        data={DUMMY_REVIEW_DATA}
        keyExtractor={(item) => String(item.id)}
        style={{ padding: 16, backgroundColor: 'white' }}
        ItemSeparatorComponent={() => (
          <View style={[common.separator, common.mv16, { width: width }]} />
        )}
        renderItem={({ item }) => (
          <ReviewTabItem
            nickname={item.nickname}
            type={item.type}
            date={item.date}
            review={item.review}
          />
        )}
      />
    );
  };

  if (!memberInfo) return null;

  // TODO: isFollowing 추가
  return (
    <>
      <Header
        memberId={memberInfo.seq}
        profileImageOriginFileUrl={memberInfo.profileImage?.originFileUrl}
        nickname={memberInfo.nickname}
        name={memberInfo.name}
        field={memberInfo.field}
        career={memberInfo.career}
        address={memberInfo.address}
        followerCount={memberInfo.followerCount}
        onPencilIconPress={() => navigation.navigate('ProfileEdit')}
      />
      <Tab.Navigator screenOptions={materialTopTabNavigationOptions}>
        <Tab.Screen name="내 소개" component={MyIntroductionTab} />
        <Tab.Screen name="받은 후기" component={ReviewTab} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: BLUE.DEFAULT,
  },
  pencil: { position: 'absolute', right: 16, top: 16 },
  profileBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
    position: 'relative',
  },
  thumbnailBox: {
    alignItems: 'center',
    backgroundColor: GRAY.LIGHT,
    borderRadius: 40,
    height: 60,
    justifyContent: 'center',
    width: 60,
  },
});
