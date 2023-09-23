import CommunityMyBookmarkTab from '@/components/Community/CommunityMyBookmarkTab';
import CommunityMyPostTab from '@/components/Community/CommunityMyPostTab';
import { materialTopTabNavigationOptions } from '@/utils/options/tab';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const CommunityMyScreenTabView = () => {
  return (
    <Tab.Navigator screenOptions={materialTopTabNavigationOptions}>
      <Tab.Screen name="작성 내역" component={CommunityMyPostTab} />
      <Tab.Screen name="북마크" component={CommunityMyBookmarkTab} />
    </Tab.Navigator>
  );
};

export default CommunityMyScreenTabView;
