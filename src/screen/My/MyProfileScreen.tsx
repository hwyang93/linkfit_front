import {FetchMemberInfoResponse} from '@/types/api/member';
import {SCREEN_WIDTH} from '@/utils/constants/common';
import {iconPath} from '@/utils/iconPath';
import {materialTopTabNavigationOptions} from '@/utils/options/tab';
import {fetchMemberInfo} from '@api/member';
import toast from '@hooks/toast';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {BLUE, GRAY} from '@styles/colors';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {LoggedInParamList} from '../../../AppInner';

const DUMMY_MY_INTRODUCTION_DATA = [
  {src: require('@images/instructor_01.png')},
  {src: require('@images/instructor_02.png')},
  {src: require('@images/instructor_03.png')},
  {src: require('@images/instructor_04.png')},
  {src: require('@images/instructor_05.png')},
];

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
  profileImageOriginFileUrl?: string;
  nickname?: string;
  name?: string;
  field?: string;
  career?: string | null;
  address?: string;
  followerCount?: number;
  onPencilIconPress: () => void;
}

const Header: React.FC<HeaderProps> = ({
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
      <View style={[common.mr16, styles.thumbnailBox]}>
        <Image
          source={
            profileImageOriginFileUrl
              ? {uri: profileImageOriginFileUrl}
              : iconPath.THUMBNAIL
          }
          style={common.thumbnail_l}
        />
      </View>
      <View>
        <View style={common.rowCenter}>
          <Text style={[common.text_l, common.fwb, common.mr8]}>
            {nickname ? nickname : name}
          </Text>
          <View style={common.rowCenter}>
            <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>인증강사</Text>
            <Image
              style={{marginLeft: 2, width: 14, height: 14}}
              source={iconPath.CERTIFICATION}
            />
          </View>
        </View>

        <View style={common.rowCenter}>
          <Text style={[common.text_m, common.fwb, common.mr8]}>{field}</Text>
          <Text style={[common.text]}>{career}</Text>
          <Text style={[common.mh8]}>|</Text>
          <Text style={[common.text_s, common.fcg]}>{address}</Text>
        </View>

        <View style={common.rowCenter}>
          <Pressable onPress={() => Alert.alert('click', 'test')}>
            <Image
              source={iconPath.FAVORITE_FILL}
              style={[common.size24, common.mr8]}
            />
          </Pressable>
          <Text style={[common.text_m, common.fwb, common.mr8]}>
            {followerCount}
          </Text>
        </View>
      </View>

      <Pressable style={styles.pencil} onPress={onPencilIconPress}>
        <Image source={iconPath.PENCIL_B} style={[common.size24]} />
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

const ReviewTabItem: React.FC<ReviewTabItemProps> = ({
  nickname,
  type,
  date,
  review,
}) => {
  const [textLine, setTextLine] = useState(2);

  const expandText = () => setTextLine(textLine === 2 ? 0 : 2);

  return (
    <>
      <View style={[common.row, common.mb8]}>
        <Text style={[common.text_m, common.fwb, common.fs18]}>{nickname}</Text>
        <Text
          style={[common.text, {alignSelf: 'flex-end', marginHorizontal: 4}]}>
          {type}
        </Text>
        <Text style={[common.text, {alignSelf: 'flex-end'}]}>{date}</Text>
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
  src: ImageSourcePropType;
  onPress?: () => void;
}

const MyIntroductionTabItem: React.FC<MyIntroductionTabItemProps> = ({
  src,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Image
        source={src}
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

const MyProfileScreen: React.FC = () => {
  const [memberInfo, setMemberInfo] = useState<FetchMemberInfoResponse>();

  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchMemberInfo()
        .then(({data}) => {
          setMemberInfo(data);
        })
        .catch(error => {
          if (isAxiosError(error)) {
            toast.error({message: error.message});
          }
        });
    }
  }, [isFocused]);

  const renderMyIntroductionTabItem = ({
    item,
  }: {
    item: MyIntroductionTabItemProps;
  }) => (
    <MyIntroductionTabItem
      src={item.src}
      onPress={() => navigation.navigate('Gallery')}
    />
  );

  const renderReviewTabItem = ({item}: {item: ReviewTabItemProps}) => (
    <ReviewTabItem
      nickname={item.nickname}
      type={item.type}
      date={item.date}
      review={item.review}
    />
  );

  const MyIntroductionTab: React.FC = () => {
    return (
      <FlatList
        data={DUMMY_MY_INTRODUCTION_DATA}
        renderItem={renderMyIntroductionTabItem}
        numColumns={3}
        ListHeaderComponent={<MyIntroductionTabHeader />}
        style={{padding: 16, backgroundColor: 'white'}}
      />
    );
  };

  const ReviewTab: React.FC = () => {
    return (
      <FlatList
        data={DUMMY_REVIEW_DATA}
        renderItem={renderReviewTabItem}
        keyExtractor={item => String(item.id)}
        style={{padding: 16, backgroundColor: 'white'}}
        ItemSeparatorComponent={() => (
          <View style={[common.separator, common.mv16, {width: width}]} />
        )}
      />
    );
  };

  return (
    <>
      <Header
        profileImageOriginFileUrl={memberInfo?.profileImage.originFileUrl}
        nickname={memberInfo?.nickname}
        name={memberInfo?.name}
        field={memberInfo?.field}
        career={memberInfo?.career}
        address={memberInfo?.address}
        followerCount={memberInfo?.followerCount}
        onPencilIconPress={() =>
          navigation.navigate('ProfileEdit', {memberInfo})
        }
      />
      <Tab.Navigator screenOptions={materialTopTabNavigationOptions}>
        <Tab.Screen name="내 소개" component={MyIntroductionTab} />
        <Tab.Screen name="받은 후기" component={ReviewTab} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  pencil: {position: 'absolute', top: 16, right: 16},
  indicator: {
    backgroundColor: BLUE.DEFAULT,
  },
  profileBox: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  thumbnailBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: GRAY.LIGHT,
  },
});

export default MyProfileScreen;
