import {materialTopTabNavigationOptions} from '@/utils/options/tab';
import BookmarkCommunityComponent from '@components/My/BookmarkCommunityComponent';
import BookmarkJobOfferComponent from '@components/My/BookmarkJobOfferComponent';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {WHITE} from '@styles/colors';
import common from '@styles/common';
import {StyleSheet, View} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const JobOfferTab: React.FC = () => {
  return (
    <View style={[styles.container, common.pt16]}>
      <BookmarkJobOfferComponent />
    </View>
  );
};

const CommunityTab: React.FC = () => {
  return (
    <View style={styles.container}>
      <BookmarkCommunityComponent />
    </View>
  );
};

const BookmarkManageScreen = () => {
  return (
    <Tab.Navigator screenOptions={materialTopTabNavigationOptions}>
      <Tab.Screen name="구인공고" component={JobOfferTab} />
      <Tab.Screen name="커뮤니티" component={CommunityTab} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: WHITE,
    height: '100%',
  },
});

export default BookmarkManageScreen;
