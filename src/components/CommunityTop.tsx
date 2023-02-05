import {Text, View} from 'react-native';
import common from '@styles/common';

function CommunityTop() {
  return (
    <View>
      <View>
        <Text>필터 영역</Text>
      </View>

      <View>
        <Text style={common.title}>인기 게시글</Text>
        {/* 슬라이드 아이템 */}
      </View>
    </View>
  );
}

export default CommunityTop;
