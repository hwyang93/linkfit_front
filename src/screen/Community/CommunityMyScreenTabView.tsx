import {materialTopTabNavigationOptions} from '@/utils/options/tab';
import CommunityMyBookmark from '@components/Community/CommunityMyBookmark';
import CommunityMyPost from '@components/Community/CommunityMyPost';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const CommunityMyScreenTabView = () => {
  return (
    <Tab.Navigator screenOptions={materialTopTabNavigationOptions}>
      <Tab.Screen name="작성 내역" component={CommunityMyPost} />
      <Tab.Screen name="북마크" component={CommunityMyBookmark} />
    </Tab.Navigator>
  );
};

export default CommunityMyScreenTabView;
