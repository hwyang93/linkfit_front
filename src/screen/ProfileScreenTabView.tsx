import {useAppSelector} from '@/store';
import {MemberReputationEntity} from '@/types/api/entities';
import {FetchInstructorResponse} from '@/types/api/instructor';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/utils/constants/common';
import {iconPath} from '@/utils/iconPath';
import {fetchInstructor} from '@api/instructor';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Image,
  PanResponder,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import {LoggedInParamList} from '../../AppInner';

const TAB_BAR_HEIGHT = 48;
const HEADER_HEIGHT = 200;

const TAB1_DATA = [
  {src: require('@images/instructor_01.png')},
  {src: require('@images/instructor_02.png')},
  {src: require('@images/instructor_03.png')},
  {src: require('@images/instructor_04.png')},
  {src: require('@images/instructor_05.png')},
];

const SafeStatusBar = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
});

const imageSize = (SCREEN_WIDTH - 38) / 3;

const ProfileScreenTabView = () => {
  const [instructor, setInstructor] = useState<FetchInstructorResponse>();
  const [reputation, setReputation] = useState<MemberReputationEntity[]>();

  const memberInfo = useAppSelector(state => state.user);

  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const route = useRoute<RouteProp<LoggedInParamList, 'Profile'>>();

  useEffect(() => {
    const loadData = async () => {
      await fetchInstructor(route.params.memberSeq)
        .then(({data}) => {
          setInstructor(data);
          setReputation(data.reputations);
        })
        .catch(error => {
          console.log(error);
        });
    };
    loadData();
  }, [route.params.memberSeq]);
  // stats
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'tab1', title: '강사소개'},
    {key: 'tab2', title: '강사후기'},
  ]);
  const [canScroll, setCanScroll] = useState(true);

  // ref
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerScrollY = useRef(new Animated.Value(0)).current;
  const listRefArr = useRef([]);
  const listOffset = useRef({});
  const isListGliding = useRef(false);
  const headerScrollStart = useRef(0);
  const _tabIndex = useRef(0);

  // PanResponder for header
  const headerPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => false,
      onStartShouldSetPanResponder: () => {
        headerScrollY.stopAnimation();
        syncScrollOffset();
        return false;
      },

      onMoveShouldSetPanResponder: (_, gestureState) => {
        headerScrollY.stopAnimation();
        return Math.abs(gestureState.dy) > 5;
      },

      onPanResponderRelease: (_, gestureState) => {
        syncScrollOffset();
        if (Math.abs(gestureState.vy) < 0.2) {
          return;
        }
        headerScrollY.setValue(scrollY._value);
        Animated.decay(headerScrollY, {
          velocity: -gestureState.vy,
          useNativeDriver: true,
        }).start(() => {
          syncScrollOffset();
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        listRefArr.current.forEach(item => {
          if (item.key !== routes[_tabIndex.current].key) {
            return;
          }
          if (item.value) {
            item.value.scrollToOffset({
              offset: -gestureState.dy + headerScrollStart.current,
              animated: false,
            });
          }
        });
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: () => {
        headerScrollStart.current = scrollY._value;
      },
    }),
  ).current;

  // PanResponder for list in tab scene
  const listPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => false,
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => {
        headerScrollY.stopAnimation();
        return false;
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: () => {
        headerScrollY.stopAnimation();
      },
    }),
  ).current;

  // effect
  useEffect(() => {
    scrollY.addListener(({value}) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });

    headerScrollY.addListener(({value}) => {
      listRefArr.current.forEach(item => {
        if (item.key !== routes[tabIndex].key) {
          return;
        }
        if (value > HEADER_HEIGHT || value < 0) {
          headerScrollY.stopAnimation();
          syncScrollOffset();
        }
        if (item.value && value <= HEADER_HEIGHT) {
          item.value.scrollToOffset({
            offset: value,
            animated: false,
          });
        }
      });
    });
    return () => {
      scrollY.removeAllListeners();
      headerScrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  // helper functions
  const syncScrollOffset = () => {
    const curRouteKey = routes[_tabIndex.current].key;

    listRefArr.current.forEach(item => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HEADER_HEIGHT && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HEADER_HEIGHT) {
          if (
            listOffset.current[item.key] < HEADER_HEIGHT ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HEADER_HEIGHT,

                animated: false,
              });
              listOffset.current[item.key] = HEADER_HEIGHT;
            }
          }
        }
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  // render Helper
  const renderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],

      outputRange: [0, -HEADER_HEIGHT],

      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        {...headerPanResponder.panHandlers}
        style={[styles.header, {transform: [{translateY: y}]}]}>
        <View style={styles.profileBox}>
          <View style={[common.mr16, styles.thumbnailBox]}>
            <Image source={iconPath.PILATES} style={styles.thumbnail} />
          </View>
          <View>
            <View style={common.rowCenter}>
              <Text style={[common.text_l, common.fwb, common.mr8]}>
                {instructor?.nickname}
              </Text>
              <View style={common.rowCenter}>
                <Text style={[common.text_s, {color: BLUE.DEFAULT}]}>
                  인증강사
                </Text>
                <Image
                  style={[
                    common.size24,
                    {marginLeft: 2, width: 14, height: 14},
                  ]}
                  source={iconPath.CERTIFICATION}
                />
              </View>
            </View>

            <View style={common.rowCenter}>
              <Text style={[common.text_m, common.fwb, common.mr8]}>
                필라테스
              </Text>
              <Text style={[common.text, {alignSelf: 'flex-end'}]}>
                {instructor?.career}
              </Text>
              <Text style={[common.mh8, common.fcg]}>|</Text>
              <Text style={[common.text_s, common.fcg]}>
                {instructor?.address}
              </Text>
            </View>

            <View style={common.rowCenter}>
              <Pressable onPress={() => Alert.alert('click', 'test')}>
                <Image
                  source={iconPath.FAVORITE}
                  style={[common.size24, common.mr8]}
                />
              </Pressable>
              <Text style={[common.text_m, common.fwb, common.mr8]}>
                {instructor?.follower}
              </Text>
              <Text style={common.text}>3시간 전 접속</Text>
            </View>
          </View>
          {}
          <Pressable
            style={styles.kebabIcon}
            hitSlop={10}
            onPress={() => Alert.alert('click', 'test')}>
            <Image source={iconPath.KEBAB} style={[common.size24]} />
          </Pressable>
        </View>

        <View style={common.mb16}>
          <Text style={[common.text_m, common.fwb, common.mb8]}>소개글</Text>
          <Text style={common.text_m}>{instructor?.intro}</Text>
        </View>

        {/*링크 영역 */}
        {/*<View style={[common.rowCenterBetween, common.mb20]}>*/}
        {/*  <Text style={[common.text_m, common.fwb, common.mb8]}>링크</Text>*/}
        {/*  <LinkCollection />*/}
        {/*</View>*/}
      </Animated.View>
    );
  };

  type imageProps = {
    item: any;
  };

  const renderTab1Item = ({item}: imageProps) => {
    return (
      <Pressable onPress={() => navigation.navigate('Gallery')}>
        <Image
          source={item.src}
          style={{
            width: imageSize,
            height: imageSize,
            margin: 1,
          }}
        />
      </Pressable>
    );
  };

  type reviewProps = {
    item: {
      seq: number;
      updateAt: string;
      evaluationMemberSeq: number;
      evaluationMember: {
        nickname: string;
        type: string;
      };
      comment: string;
    };
  };

  const renderTab2Item = ({item}: reviewProps) => {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[common.text_m, common.fwb, common.fs18]}>
            {item.evaluationMember.nickname}
          </Text>
          <Text
            style={[common.text, {alignSelf: 'flex-end', marginHorizontal: 4}]}>
            {item.evaluationMember.type === 'INSTRUCTOR' ? '강사' : '센터'}
          </Text>
          <Text style={[common.text, {alignSelf: 'flex-end'}]}>
            {item.updateAt}
          </Text>
        </View>
        <Text style={common.text_m} numberOfLines={2}>
          {item.comment}
        </Text>
        {memberInfo.seq === item.evaluationMemberSeq ? (
          <Pressable
            style={styles.kebabIcon}
            hitSlop={10}
            onPress={() => Alert.alert('click', 'test')}>
            <Image source={iconPath.KEBAB} style={[common.size24]} />
          </Pressable>
        ) : (
          ''
        )}
      </View>
    );
  };

  const Tab1Header = () => {
    return (
      <View style={common.mb8}>
        <Text style={[common.text_m, common.fwb]}>포트폴리오</Text>
      </View>
    );
  };
  const Tab2Header = () => {
    return <View style={common.mb24} />;
  };
  const Tab1Footer = () => {
    return (
      <View
        style={[common.mt16, common.rowCenter, {justifyContent: 'flex-end'}]}>
        <Image source={iconPath.RESUME} style={common.size24} />
        <Text style={common.text_m}>이력서 보기</Text>
      </View>
    );
  };
  const Tab2Footer = () => {
    return null;
  };
  const Tab1Separator = () => {
    return null;
  };
  const Tab2Separator = () => {
    return <View style={[common.separator, common.mv16]} />;
  };

  const renderLabel = ({route, focused}: any) => {
    return (
      <Text
        style={[
          common.text_m,
          styles.label,
          focused && {color: BLUE.DEFAULT, fontWeight: '700'},
        ]}>
        {route.title}
      </Text>
    );
  };

  const renderScene = ({route}) => {
    const focused = route.key === routes[tabIndex].key;
    let numCols;
    let data;
    let renderItem;
    switch (route.key) {
      case 'tab1':
        numCols = 3;
        data = TAB1_DATA;
        renderItem = renderTab1Item;
        ListHeaderComponent = Tab1Header;
        ItemSeparatorComponent = Tab1Separator;
        ListFooterComponent = Tab1Footer;
        break;
      case 'tab2':
        numCols = 1;
        data = reputation;
        renderItem = renderTab2Item;
        ListHeaderComponent = Tab2Header;
        ItemSeparatorComponent = Tab2Separator;
        ListFooterComponent = Tab2Footer;
        break;
      default:
        return null;
    }
    return (
      <Animated.FlatList
        // scrollEnabled={canScroll}
        {...listPanResponder.panHandlers}
        numColumns={numCols}
        ref={ref => {
          if (ref) {
            const found = listRefArr.current.find(e => e.key === route.key);
            if (!found) {
              listRefArr.current.push({
                key: route.key,
                value: ref,
              });
            }
          }
        }}
        scrollEventThrottle={16}
        onScroll={
          focused
            ? Animated.event(
                [
                  {
                    nativeEvent: {contentOffset: {y: scrollY}},
                  },
                ],
                {useNativeDriver: true},
              )
            : null
        }
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT + 7,

          paddingHorizontal: 16,
          minHeight: SCREEN_HEIGHT - SafeStatusBar + HEADER_HEIGHT,
        }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const renderTabBar = (props: any) => {
    const y = scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],

      outputRange: [HEADER_HEIGHT, 0],

      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={{
          top: 0,
          zIndex: 1,
          position: 'absolute',
          transform: [{translateY: y}],
          width: '100%',
        }}>
        {/* 강사소개 강사 후기 탭바 */}
        <TabBar
          {...props}
          onTabPress={({preventDefault}) => {
            if (isListGliding.current) {
              preventDefault();
            }
          }}
          style={[styles.tab]}
          renderLabel={renderLabel}
          indicatorStyle={styles.indicator}
        />
      </Animated.View>
    );
  };

  const renderTabView = () => {
    return (
      <TabView
        onSwipeStart={() => setCanScroll(false)}
        onSwipeEnd={() => setCanScroll(true)}
        onIndexChange={id => {
          _tabIndex.current = id;
          setIndex(id);
        }}
        navigationState={{index: tabIndex, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        initialLayout={{
          height: 0,
          width: SCREEN_WIDTH,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderTabView()}
      {renderHeader()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  header: {
    height: HEADER_HEIGHT,

    width: '100%',
    position: 'absolute',
    padding: 16,
  },
  label: {
    fontSize: 16,
    color: GRAY.DEFAULT,
  },
  tab: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: WHITE,
    height: TAB_BAR_HEIGHT,
    borderBottomWidth: 1,
    borderColor: GRAY.LIGHT,
    marginHorizontal: 16,
  },
  indicator: {
    backgroundColor: BLUE.DEFAULT,
  },
  tabItem: {
    borderBottomWidth: 1,
    borderColor: GRAY.DEFAULT,
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
  thumbnail: {width: '50%', height: '50%'},
  kebabIcon: {position: 'absolute', top: 0, right: 0},
});

export default ProfileScreenTabView;
