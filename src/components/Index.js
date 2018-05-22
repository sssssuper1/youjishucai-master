/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import pxToDp from '../js/pxToDp';
import Home from './Home';
import Community from './Community';
import Vip from './Vip';
import My from './My';
import TabNavigator from 'react-native-tab-navigator';
import { StackNavigator } from 'react-navigation';
import store from '../store/index'
global.url="http://192.168.0.97:100"

export default class Index extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    if (!!params && !!params.selectedTab) {
      this.state = {
        selectedTab: params.selectedTab
      }
    } else {
      this.state = {
        selectedTab: 'home'
      }
    }
  }
  static navigationOptions = {
    header:null
  };
  render() {
    return (
        <TabNavigator tabBarStyle={{backgroundColor:'white',height: pxToDp(114),alignItems: 'center'}}>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'home'}
              title="有机蔬菜"
              tabStyle={{color:'white'}}
              titleStyle={{color:'#999'}}
              selectedTitleStyle={{color:'#01d6c2'}}
              renderIcon={() => <Image style={styles.menuImg1} source={require('../images/menu1-1.png')} />}
              renderSelectedIcon={() => <Image style={styles.menuImg1} source={require('../images/menu1-2.png')} />}
              onPress={() => this.setState({ selectedTab: 'home' })}>
            <Home navigation={this.props.navigation} />
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'payment'}
              title="正弘新社群"
              titleStyle={{color:'#999'}}
              selectedTitleStyle={{color:'#01d6c2'}}
              renderIcon={() => <Image style={styles.menuImg2} source={require('../images/menu2-1.png')} />}
              renderSelectedIcon={() => <Image style={styles.menuImg2} source={require('../images/menu2-2.png')} />}
              onPress={() => this.setState({ selectedTab: 'payment' })}>
              <Community navigation={this.props.navigation} />
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'vip'}
              title="vIP会员"
              selectedTitleStyle={{color:'#01d6c2'}}
              titleStyle={{color:'#999'}}
              renderIcon={() => <Image style={styles.menuImg3} source={require('../images/menu3-1.png')} />}
              renderSelectedIcon={() => <Image style={styles.menuImg3} source={require('../images/menu3-2.png')} />}
              onPress={() => this.setState({ selectedTab: 'vip' })}>
              <Vip navigation={this.props.navigation}  />
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'my'}
              title="我的"
              selectedTitleStyle={{color:'#01d6c2'}}
              titleStyle={{color:'#999'}}
              renderIcon={() => <Image style={styles.menuImg4} source={require('../images/menu4-1.png')} />}
              renderSelectedIcon={() => <Image style={styles.menuImg4} source={require('../images/menu4-2.png')} />}
              onPress={() => this.setState({ selectedTab: 'my' })}>
              <My  navigation={this.props.navigation} />
          </TabNavigator.Item>
        </TabNavigator>
    );
  }
}


const styles = StyleSheet.create({
  menuImg1: {
    marginTop:pxToDp(10),
    width:pxToDp(46),
    height:pxToDp(44)
  },
  menuImg2: {
    marginTop:pxToDp(10),
    width:pxToDp(41),
    height:pxToDp(41)
  },
  menuImg3: {
    marginTop:pxToDp(10),
    width:pxToDp(54),
    height:pxToDp(50)
  },
  menuImg4: {
    marginTop:pxToDp(10),
    width:pxToDp(44),
    height:pxToDp(48)
  },
});
