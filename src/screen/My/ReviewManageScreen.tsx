import * as React from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import common from '@styles/common';
import {BLUE, GRAY} from '@styles/colors';
import {useState} from 'react';

const FirstRoute = () => (
  <View style={[styles.container, {backgroundColor: '#ff4081'}]} />
);
const SecondRoute = () => (
  <View style={[styles.container, {backgroundColor: '#673ab7'}]} />
);
//
// function ReviewManageScreen() {
//   return (
//
//   )
// }

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      {key: 'first', title: '구직'},
      {key: 'second', title: '구인'},
    ],
    selectedTab: 0,
  };

  _handleIndexChange = index => this.setState({index});

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    // const [selectedTab, setSelectedTab] = useState();

    return (
      <View style={[styles.tabBar]}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({index: i, selectedTab: i})}>
              <Animated.Text style={[common.text_m, {opacity}]}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: GRAY.LIGHT,
  },
  active: {
    color: BLUE.DEFAULT,
    borderBottomWidth: 2,
    borderColor: BLUE.DEFAULT,
  },
});
