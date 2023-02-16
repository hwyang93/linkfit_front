import {FlatList, StyleSheet, Text, View} from 'react-native';

import {WHITE} from '@styles/colors';
import common from '@styles/common';

import CommunityTop from '@components/CommunityTop';
import RecommendedPostItem from '@components/RecommendedPostItem';
import {iconPath} from '@util/iconPath';
import FloatingWriteButton from '@components/FloatingWriteButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LoggedInParamList} from '../../AppInner';

function CommunityScreen() {
  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();
  const FILTER = [
    {
      name: '전체',
      active: true,
    },
    {
      name: '필라테스',
      active: false,
    },
    {
      name: '요가',
      active: false,
    },
    {
      name: '채널',
      active: false,
    },
    {
      name: '채널',
      active: false,
    },
    {
      name: '채널',
      active: false,
    },
    {
      name: '채널',
      active: false,
    },
    {
      name: '채널',
      active: false,
    },
  ];

  const RECOMMENDED = [
    {
      seq: 1,
      title: '나랏말싸미듕국에달다달아',
      type: '센터',
      companyName: '비와이프테스',
      date: '2022.12.12',
      content: '좋게말할때 등록해라. 한달에 20만원 세달하면 할인해서 80만원.',
    },
    {
      seq: 2,
      title: '게시글 제목어르신이라고',
      type: '강사',
      nickname: '요를레이킴',
      date: '2022.12.12',
      content: '좋게말할때 등록해라. 한달에 20만원 세달하면 할인해서 80만원.',
    },
    {
      seq: 3,
      title: '게시글 제목이라고라고',
      type: '강사',
      nickname: '요가프레임',
      date: '2022.12.12',
      content: '좋게말할때 등록해라. 한달에 20만원 세달하면 할인해서 80만원.',
    },
  ];

  function renderItem({item}: any) {
    return <RecommendedPostItem item={item} />;
  }

  const moveToForm = () => {
    navigation.navigate('PostForm');
  };

  return (
    <View style={styles.container}>
      {/* 필터 영역 */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal={true}
          data={FILTER}
          renderItem={({item}) => (
            <View
              style={[common.filterBox, item.active && common.filterBoxActive]}>
              <Text
                style={[
                  common.filterText,
                  item.active && common.filterTextActive,
                ]}>
                {item.name}
              </Text>
            </View>
          )}
        />
      </View>
      {/* 필터 영역 */}

      <FlatList
        data={RECOMMENDED}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={<CommunityTop />}
        ItemSeparatorComponent={() => (
          <View style={[common.separator, common.mv16]} />
        )}
      />

      <FloatingWriteButton icon={iconPath.PENCIL_W} job={moveToForm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: WHITE,
  },
  filterContainer: {
    paddingVertical: 8,
  },
});

export default CommunityScreen;
