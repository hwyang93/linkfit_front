import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import {Tabs, MaterialTabBar} from 'react-native-collapsible-tab-view';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {LoggedInParamList} from '../../../AppInner';
import {useCallback, useEffect, useState} from 'react';
import {fetchMemberInfo} from '@api/member';
import toast from '@hooks/toast';

// const HEADER_HEIGHT = 250;

const width = Dimensions.get('window').width - 32;
const tabWidth = width / 2;
const imageSize = (width - 6) / 3;

function Header() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const [memberInfo, setMemberInfo] = useState<any>({});
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      fetchMemberInfo()
        .then(({data}: any) => {
          setMemberInfo(data);
        })
        .catch((e: any) => {
          toast.error({message: e.message});
        });
    }
  }, [isFocused]);
  return (
    <View>
      <View style={styles.profileBox}>
        <View style={[common.mr16, styles.thumbnailBox]}>
          <Image
            source={
              memberInfo.profileImage
                ? {uri: memberInfo.profileImage.originFileUrl}
                : iconPath.THUMBNAIL
            }
            style={common.thumbnail_l}
          />
        </View>
        <View>
          <View style={common.rowCenter}>
            <Text style={[common.text_l, common.fwb, common.mr8]}>
              {memberInfo.nickname ? memberInfo.nickname : memberInfo.name}
            </Text>
            <View style={common.rowCenter}>
              <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>
                인증강사
              </Text>
              <Image
                style={{marginLeft: 2, width: 14, height: 14}}
                source={iconPath.CERTIFICATION}
              />
            </View>
          </View>

          <View style={common.rowCenter}>
            <Text style={[common.text_m, common.fwb, common.mr8]}>
              {memberInfo.field}
            </Text>
            <Text style={[common.text]}>{memberInfo.career}</Text>
            <Text style={[common.mh8]}>|</Text>
            <Text style={[common.text_s, common.fcg]}>
              {memberInfo.address}
            </Text>
          </View>

          <View style={common.rowCenter}>
            <Pressable onPress={() => Alert.alert('click', 'test')}>
              <Image
                source={iconPath.FAVORITE_FILL}
                style={[common.size24, common.mr8]}
              />
            </Pressable>
            <Text style={[common.text_m, common.fwb, common.mr8]}>
              {memberInfo.followerCount}
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.pencil}
          onPress={() => navigation.navigate('ProfileEdit', {memberInfo})}>
          <Image source={iconPath.PENCIL_B} style={[common.size24]} />
        </Pressable>
      </View>
    </View>
  );
}
// 센터 프로필 상단 영역 끝

function MyProfileScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  const tab1Data = [
    {src: require('@images/instructor_01.png')},
    {src: require('@images/instructor_02.png')},
    {src: require('@images/instructor_03.png')},
    {src: require('@images/instructor_04.png')},
    {src: require('@images/instructor_05.png')},
  ];
  const tab2Data = [
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

  const IntroduceTabHeader = () => {
    return (
      <View style={common.mv8}>
        <Text style={[common.text_m, common.fwb]}>포트폴리오</Text>
      </View>
    );
  };

  // 탭 바 영역
  const tabBar = (props: any) => (
    <MaterialTabBar
      {...props}
      style={styles.tab}
      inactiveColor={GRAY.DEFAULT}
      indicatorStyle={styles.indicator}
      activeColor={BLUE.DEFAULT}
      itemStyle={{width: tabWidth}}
      labelStyle={common.text_m}
      contentContainerStyle={{
        // flex: 1,
        width: width,
      }}
    />
  );

  type imageProps = {
    item: any;
  };

  const IntroduceTab = useCallback(
    ({item}: imageProps) => {
      return (
        <>
          <Pressable onPress={() => navigation.navigate('Gallery')}>
            <Image
              source={item.src}
              resizeMode={'cover'}
              style={{
                width: imageSize,
                height: imageSize,
                margin: 1,
              }}
            />
          </Pressable>
        </>
      );
    },
    [navigation],
  );

  type reviewProps = {
    item: {
      id: number;
      nickname: string;
      type: string;
      date: string;
      review: string;
    };
  };

  const [textLine, setTextLine] = useState(2);

  const ReviewTab = useCallback(
    ({item}: reviewProps) => {
      const textExpansion = () => {
        if (textLine === 2) {
          setTextLine(0);
        } else {
          setTextLine(2);
        }
      };
      return (
        <View
          style={{
            width: width,
            // padding: 16,
          }}>
          <View style={[common.row, common.mb8]}>
            <Text style={[common.text_m, common.fwb, common.fs18]}>
              {item.nickname}
            </Text>
            <Text
              style={[
                common.text,
                {alignSelf: 'flex-end', marginHorizontal: 4},
              ]}>
              {item.type}
            </Text>
            <Text style={[common.text, {alignSelf: 'flex-end'}]}>
              {item.date}
            </Text>
          </View>
          <Pressable onPress={textExpansion}>
            <Text style={common.text_m} numberOfLines={textLine}>
              {item.review}
            </Text>
          </Pressable>
        </View>
      );
    },
    [textLine],
  );

  return (
    <Tabs.Container
      renderHeader={Header}
      headerContainerStyle={{
        paddingTop: 16,
        paddingHorizontal: 16,
        shadowOpacity: 0,
        elevation: 0,
      }}
      // headerHeight={HEADER_HEIGHT}
      renderTabBar={tabBar}>
      <Tabs.Tab name="내 소개">
        <View style={{padding: 16}}>
          <Tabs.FlatList
            data={tab1Data}
            ListHeaderComponent={IntroduceTabHeader}
            renderItem={IntroduceTab}
            numColumns={3}
            keyExtractor={(item: any) => item.id}
          />
        </View>
      </Tabs.Tab>
      <Tabs.Tab name="받은 후기">
        <View style={{padding: 16}}>
          <Tabs.FlatList
            data={tab2Data}
            ListHeaderComponent={<View style={{paddingBottom: 16}} />}
            ItemSeparatorComponent={() => {
              return (
                <View style={[common.separator, common.mv16, {width: width}]} />
              );
            }}
            renderItem={ReviewTab}
            keyExtractor={(item: any) => item.id}
          />
        </View>
      </Tabs.Tab>
    </Tabs.Container>
  );
}

const styles = StyleSheet.create({
  pencil: {position: 'absolute', top: 0, right: 0},
  tab: {
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderColor: GRAY.LIGHT,
  },
  indicator: {
    width: tabWidth,
    backgroundColor: BLUE.DEFAULT,
  },
  profileBox: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 16,
  },
  thumbnailBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: GRAY.LIGHT,
  },
  // thumbnail: {width: '50%', height: '50%'},
  kebabIcon: {position: 'absolute', top: 0, right: 0},
});

export default MyProfileScreen;
