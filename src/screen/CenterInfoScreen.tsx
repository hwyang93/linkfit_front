import {SafeAreaView} from 'react-native';

import CenterInfoScreenTabView from '@screen/CenterInfoScreenTabView';

const CenterInfoScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* 탭뷰 컴포넌트 */}
      <CenterInfoScreenTabView />
    </SafeAreaView>
  );
};

export default CenterInfoScreen;
