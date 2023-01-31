import {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  Platform,
  Alert,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import common from '@styles/common';
import {iconPath} from '@util/iconPath';
import {BLUE, GRAY, WHITE} from '@styles/colors';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const TabBarHeight = 48;
const HeaderHeight = 240;
const SafeStatusBar = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
});

const imageSize = (windowWidth - 32) / 3;

const ProfileScreenTabView = () => {
  // stats
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'tab1', title: '강사 소개'},
    {key: 'tab2', title: '강사 후기'},
  ]);
  const [canScroll, setCanScroll] = useState(true);
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
      review: '후기 내용 입니다. 저팔계지만 유연해요. 깜짝 놀랐어요.',
    },
    {
      id: 2,
      nickname: '소다늠',
      type: '강사',
      date: '2023.1.12',
      review: '젓가락이지만 유연해요. 깜짝 놀랐어요.',
    },
  ];

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
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        syncScrollOffset();
        return false;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return Math.abs(gestureState.dy) > 5;
      },

      onPanResponderRelease: (evt, gestureState) => {
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
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollStart.current = scrollY._value;
      },
    }),
  ).current;

  // PanResponder for list in tab scene
  const listPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return false;
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
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
        if (value > HeaderHeight || value < 0) {
          headerScrollY.stopAnimation();
          syncScrollOffset();
        }
        if (item.value && value <= HeaderHeight) {
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
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
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
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
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
                닉네임
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
                필라테스
              </Text>
              <Text style={[common.text, {alignSelf: 'flex-end'}]}>3년</Text>
              <Text style={{marginHorizontal: 8}}>|</Text>
              <Text style={[common.text_s]}>서울 송파구</Text>
            </View>

            <View style={common.rowCenter}>
              <Pressable onPress={() => Alert.alert('click', 'test')}>
                <Image
                  source={iconPath.FAVORITE}
                  style={[common.FAVORITE, common.mr8]}
                />
              </Pressable>
              <Text style={[common.text_m, common.fwb, common.mr8]}>23</Text>
              <Text style={common.text}>3시간 전 접속</Text>
            </View>
          </View>
          <Pressable
            style={styles.kebabIcon}
            hitSlop={10}
            onPress={() => Alert.alert('click', 'test')}>
            <Image source={iconPath.KEBAB} style={[common.KEBAB]} />
          </Pressable>
        </View>

        <View style={common.mb16}>
          <Text style={[common.text_m, common.fwb, common.mb8]}>소개글</Text>
          <Text style={common.text_m}>
            안녕하세요. 3년차 필라테스 강사입니다.
          </Text>
        </View>

        {/*링크 영역 */}
        <View style={[styles.linkBox, common.mb20]}>
          <Text style={[common.text_m, common.fwb, common.mb8]}>링크</Text>
          <View style={[common.rowCenter, {justifyContent: 'space-around'}]}>
            <Pressable
              style={common.mh4}
              onPress={() => Alert.alert('알림', '클릭테스트에용')}>
              <Image source={iconPath.LINK_URL} style={[common.LINK_URL]} />
            </Pressable>
            <Pressable
              style={common.mh4}
              onPress={() => Alert.alert('알림', '클릭테스트에용')}>
              <Image source={iconPath.LINK_BLOG} style={[common.LINK_BLOG]} />
            </Pressable>
            <Pressable
              style={common.mh4}
              onPress={() => Alert.alert('알림', '클릭테스트에용')}>
              <Image
                source={iconPath.LINK_BRUNCH}
                style={[common.LINK_BRUNCH]}
              />
            </Pressable>
          </View>
        </View>
      </Animated.View>
    );
  };

  type imageProps = {
    item: any;
  };

  const renderTab1Item = ({item}: imageProps) => {
    return (
      <Pressable>
        <Image
          source={item.src}
          style={{
            width: imageSize,
            height: imageSize,
          }}
        />
      </Pressable>
    );
  };

  type reviewProps = {
    item: {
      id: number;
      nickname: string;
      type: string;
      date: string;
      review: string;
    };
  };

  const renderTab2Item = ({item}: reviewProps) => {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[common.text_m, common.fwb, common.fs18]}>
            {item.nickname}
          </Text>
          <Text
            style={[common.text, {alignSelf: 'flex-end', marginHorizontal: 4}]}>
            {item.type}
          </Text>
          <Text style={[common.text, {alignSelf: 'flex-end'}]}>
            {item.date}
          </Text>
        </View>
        <Text style={common.text_m} numberOfLines={2}>
          {item.review}
        </Text>
        <Pressable
          style={styles.kebabIcon}
          hitSlop={10}
          onPress={() => Alert.alert('click', 'test')}>
          <Image source={iconPath.KEBAB} style={[common.KEBAB]} />
        </Pressable>
      </View>
    );
  };

  const renderLabel = ({route, focused}) => {
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
        data = tab1Data;
        renderItem = renderTab1Item;
        break;
      case 'tab2':
        numCols = 1;
        data = tab2Data;
        renderItem = renderTab2Item;
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
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        ListHeaderComponent={() => <View style={{height: 10}} />}
        contentContainerStyle={{
          paddingTop: HeaderHeight + TabBarHeight + 7,
          paddingHorizontal: 16,
          minHeight: windowHeight - SafeStatusBar + HeaderHeight,
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
      inputRange: [0, HeaderHeight],
      outputRange: [HeaderHeight, 0],
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
          onTabPress={({route, preventDefault}) => {
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
          width: windowWidth,
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
    height: HeaderHeight,
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
    height: TabBarHeight,
    borderBottomWidth: 1,
    borderColor: GRAY.LIGHT,
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
  linkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ProfileScreenTabView;
