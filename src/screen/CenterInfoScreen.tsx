import {
  CompanyEntity,
  MemberReputationEntity,
  RecruitEntity,
} from '@/types/api/entities';
import {fetchCompany} from '@api/company';
import CenterInfoTop from '@components/CenterInfoTop';
import EmptySet from '@components/EmptySet';
import toast from '@hooks/toast';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BLUE, GRAY, WHITE} from '@styles/colors';
import common from '@styles/common';
import {isAxiosError} from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  MaterialTabBar,
  TabBarProps,
  Tabs,
} from 'react-native-collapsible-tab-view';
import {LoggedInParamList} from '../../AppInner';

const width = Dimensions.get('window').width - 32;
const tabWidth = width / 2;
const imageSize = (width - 6) / 3;

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

type CenterInfoScreenProps = NativeStackScreenProps<
  LoggedInParamList,
  'CenterInfo'
>;

const CenterInfoScreen = ({navigation, route}: CenterInfoScreenProps) => {
  const [centerInfo, setCenterInfo] = useState<CompanyEntity>();
  const [recruits, setRecruits] = useState<RecruitEntity[]>();
  const [reputations, setReputations] = useState<MemberReputationEntity[]>();

  const getCenterInfo = useCallback(() => {
    fetchCompany(route.params.memberSeq)
      .then(({data}) => {
        setCenterInfo(data.companyInfo);
        setRecruits(data.recruits);
        setReputations(data.reputations);
      })
      .catch(error => {
        if (isAxiosError(error)) {
          toast.error({message: error.message});
        }
      });
  }, [route.params.memberSeq]);

  useEffect(() => {
    getCenterInfo();
  }, [getCenterInfo]);

  const IntroduceTabHeader: React.FC = () => {
    return (
      <View style={common.mb8}>
        <Text style={[common.text_m, common.fwb]}>센터 사진</Text>
      </View>
    );
  };

  const IntroduceTabFooter: React.FC = () => {
    return (
      <View style={common.mt16}>
        <Text style={[common.text_m, common.fwb]}>센터 주소</Text>
        <Text style={common.text_m}>
          {`${centerInfo?.address} ${centerInfo?.addressDetail}`}
        </Text>
      </View>
    );
  };

  const tab1Data = [
    {src: require('@images/center_01.png')},
    {src: require('@images/center_02.png')},
    {src: require('@images/center_03.png')},
    {src: require('@images/center_04.png')},
    {src: require('@images/center_05.png')},
  ];

  type imageProps = {
    item: any;
  };

  const IntroduceTab = useCallback(
    ({item}: imageProps) => {
      return (
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
      );
    },
    [navigation],
  );

  const [textLine, setTextLine] = useState(2);

  const ReviewTab = useCallback(
    ({item}: any) => {
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
            <View style={{flex: 1}}>
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
                <Text
                  style={[
                    common.text,
                    {alignSelf: 'flex-end', marginHorizontal: 4},
                  ]}>
                  {item.evaluationMember?.field}
                </Text>
                <Text style={[common.text, {alignSelf: 'flex-end'}]}>
                  {item.updatedAt}
                </Text>
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
    [textLine, reputations],
  );

  return (
    <Tabs.Container
      renderTabBar={tabBar}
      renderHeader={() =>
        recruits ? (
          <CenterInfoTop centerInfo={centerInfo} recruits={recruits} />
        ) : null
      }
      allowHeaderOverscroll
      headerContainerStyle={{
        paddingTop: 16,
        paddingHorizontal: 16,
        shadowOpacity: 0,
        elevation: 0,
      }}>
      <Tabs.Tab name="센터 소개">
        <Tabs.FlatList
          style={{padding: 16}}
          data={tab1Data}
          ListHeaderComponent={() => <IntroduceTabHeader />}
          ListFooterComponent={() => <IntroduceTabFooter />}
          renderItem={IntroduceTab}
          numColumns={3}
          keyExtractor={(item: any) => item.id}
        />
      </Tabs.Tab>
      <Tabs.Tab name="후기 관리">
        <Tabs.FlatList
          style={{padding: 16}}
          data={reputations}
          ListHeaderComponent={<View style={{paddingBottom: 16}} />}
          ItemSeparatorComponent={() => {
            return (
              <View style={[common.separator, common.mv16, {width: width}]} />
            );
          }}
          renderItem={ReviewTab}
          keyExtractor={(item: any) => item.seq}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

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
});

export default CenterInfoScreen;
