import { useCompany } from '@/hooks/company/use-company';
import { SCREEN_WIDTH } from '@/lib/constants/common';
import { CompanyEntity, RecruitEntity } from '@/types/api/entities.type';
import CenterInfoTop from '@components/CenterInfoTop';
import EmptySet from '@components/EmptySet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BLUE, GRAY, WHITE } from '@styles/colors';
import common from '@styles/common';
import { useCallback, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialTabBar, TabBarProps, Tabs } from 'react-native-collapsible-tab-view';
import { LoggedInParamList } from '../../AppInner';

// const HEADER_HEIGHT = 250;

const width = SCREEN_WIDTH - 32;
const tabWidth = width / 2;
const imageSize = (width - 6) / 3;

type HeaderProps = {
  centerInfo: CompanyEntity;
  recruits: RecruitEntity[];
};
// 센터 프로필 상단 영역 시작
const Header: React.FC<HeaderProps> = ({ centerInfo, recruits }) => {
  return <CenterInfoTop centerInfo={centerInfo} recruits={recruits} fromMy={true} />;
};
// 센터 프로필 상단 영역 끝

// TODO: 스크린 이름 매칭 필요 (CenterProfile -> MyCenterProfile)
type Props = NativeStackScreenProps<LoggedInParamList, 'CenterProfile'>;

export const MyCenterProfileScreen = ({ navigation, route }: Props) => {
  const companyQuery = useCompany(route.params.memberSeq);
  const centerInfo = companyQuery.data?.companyInfo;
  const recruits = companyQuery.data?.recruits;
  const reputations = companyQuery.data?.reputations;

  // 탭 바 영역
  const tabBar = (props: TabBarProps) => (
    <MaterialTabBar
      {...props}
      style={styles.tab}
      inactiveColor={GRAY.DEFAULT}
      indicatorStyle={styles.indicator}
      activeColor={BLUE.DEFAULT}
      labelStyle={common.text_m}
      contentContainerStyle={{
        flex: 1,
        width: width,
      }}
    />
  );

  const IntroduceTabHeader = () => {
    return (
      <View style={common.mb8}>
        <Text style={[common.text_m, common.fwb]}>센터 사진</Text>
      </View>
    );
  };
  const IntroduceTabFooter = () => {
    return (
      <View style={common.mt16}>
        <Text style={[common.text_m, common.fwb]}>센터 주소</Text>
        <Text style={common.text_m}>{`${centerInfo?.address} ${centerInfo?.addressDetail}`}</Text>
      </View>
    );
  };

  const TAB1_DATA = [
    { src: require('@images/center_01.png') },
    { src: require('@images/center_02.png') },
    { src: require('@images/center_03.png') },
    { src: require('@images/center_04.png') },
    { src: require('@images/center_05.png') },
  ];

  type ImageProps = {
    item: any;
  };

  const IntroduceTab = useCallback(
    ({ item }: ImageProps) => {
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

  const [textLine, setTextLine] = useState(2);

  const ReviewTab = useCallback(
    ({ item }: any) => {
      const textExpansion = () => {
        if (textLine === 2) {
          setTextLine(0);
        } else {
          setTextLine(2);
        }
      };
      return (
        <>
          {reputations && reputations.length < 1 ? (
            <View style={{ flex: 1 }}>
              <EmptySet text={'등록된 후기가 없어요.'} />
            </View>
          ) : (
            <View
              style={{
                width: width,
                // padding: 16,
              }}>
              <View style={[common.row, common.mb8]}>
                <Text style={[common.text_m, common.fwb, common.fs18]}>
                  {item.evaluationMember?.nickname
                    ? item.evaluationMember?.nickname
                    : item.evaluationMember?.name}
                </Text>
                <Text style={[common.text, { alignSelf: 'flex-end', marginHorizontal: 4 }]}>
                  {item.evaluationMember?.field}
                </Text>
                <Text style={[common.text, { alignSelf: 'flex-end' }]}>{item.updatedAt}</Text>
              </View>
              <Pressable onPress={textExpansion}>
                <Text style={common.text_m} numberOfLines={textLine}>
                  {item.comment}
                </Text>
              </Pressable>
            </View>
          )}
        </>
      );
    },
    [textLine, reputations?.length],
  );

  if (!recruits || !centerInfo) return null;

  return (
    <Tabs.Container
      renderHeader={() => <Header centerInfo={centerInfo} recruits={recruits} />}
      allowHeaderOverscroll
      revealHeaderOnScroll
      headerContainerStyle={{
        paddingTop: 16,
        paddingHorizontal: 16,
        shadowOpacity: 0,
        elevation: 0,
      }}
      renderTabBar={tabBar}>
      <Tabs.Tab name="센터 소개">
        <View style={{ padding: 16 }}>
          <Tabs.FlatList
            data={TAB1_DATA}
            ListHeaderComponent={() => <IntroduceTabHeader />}
            ListFooterComponent={() => <IntroduceTabFooter />}
            renderItem={IntroduceTab}
            numColumns={3}
            keyExtractor={(item: any) => item.id}
          />
        </View>
      </Tabs.Tab>
      <Tabs.Tab name="후기 관리">
        <View style={{ padding: 16 }}>
          <Tabs.FlatList
            data={reputations}
            ListHeaderComponent={<View style={{ paddingBottom: 16 }} />}
            ItemSeparatorComponent={() => {
              return <View style={[common.separator, common.mv16, { width: width }]} />;
            }}
            renderItem={ReviewTab}
            keyExtractor={(item: any) => item.seq}
          />
        </View>
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  pencil: { position: 'absolute', top: 0, right: 0 },
  tab: {
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderColor: GRAY.LIGHT,
  },
  indicator: {
    width: tabWidth,
    backgroundColor: BLUE.DEFAULT,
  },
});
