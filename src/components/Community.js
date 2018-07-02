/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import types from '../actions/shopingCart'
import store from '../store/index'
import Fetch from '../js/fetch'
import Header from './Header'
import AwesomeAlert from 'react-native-awesome-alerts';
import PopupDialog from 'react-native-popup-dialog';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ListView,
  ScrollHeight,
  Dimensions,
  PanResponder,
  Animated,
  Easing,
  ImageBackground,
  Alert,
  Button,
  FlatList
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class Community extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuNum: 0,
      list: [{
        img: '',
        name: '汤一点(南京山西路店)',
        address: '南京市鼓楼区山西路1号乐购仕5F',
        distance: '10km'
      },{
        img: '',
        name: '汤一点(南京山西路店)',
        address: '南京市鼓楼区山西路1号乐购仕5F',
        distance: '10km'
      },{
        img: '',
        name: '汤一点(南京山西路店)',
        address: '南京市鼓楼区山西路1号乐购仕5F',
        distance: '10km'
      }]
    }
  }
  swipeMenu(num) { 
    this.setState({ menuNum:num})
  }

  render() {
    return (
      <View style={styles.contenier}>  
        <Header name="正弘新社群"></Header>
        <View style={styles.menuTypes}>
          <TouchableOpacity style={styles.menuItem} onPress={() => { 
            this.swipeMenu(0)
          }}>
            <View style={styles.menuImgWrap}>
              <Image style={styles.menuImg} source={this.state.menuNum===0?require("../images/tangyidian-2.png"):require("../images/tangyidian-1.png")}></Image>
            </View>
            <View style={styles.menuNameWrap}>
              <Text style={this.state.menuNum===0?styles.menuName1:styles.menuName}>汤一点</Text>
            </View>
            <View style={this.state.menuNum===0?styles.line:styles.line1}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => { 
            this.swipeMenu(1)
          }}>
            <View style={styles.menuImgWrap}>
              <Image style={styles.menuImg} source={this.state.menuNum===1?require("../images/kangyangzhongxin-2.png"):require("../images/kangyangzhongxin-1.png")}></Image>
            </View>
            <View style={styles.menuNameWrap}>
              <Text style={this.state.menuNum===1?styles.menuName1:styles.menuName}>康养中心</Text>
            </View>
            <View style={this.state.menuNum===1?styles.line:styles.line1}></View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem,styles.menuItem3]} onPress={() => { 
            this.swipeMenu(2)
          }}>
            <View style={styles.menuImgWrap}>
              <Image style={styles.menuImg} source={this.state.menuNum===2?require("../images/gongxiangzhijia-2.png"):require("../images/gongxiangzhijia-1.png")}></Image>
            </View>
            <View style={styles.menuNameWrap}>
              <Text style={this.state.menuNum===2?styles.menuName1:styles.menuName}>共享商家</Text>
            </View>
            <View style={this.state.menuNum===2?styles.line:styles.line1}></View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.list}
          style={this.state.menuNum===0?styles.list1:styles.list2}
          renderItem={({ item }) =>
            <View style={styles.list1Content}>
              <View style={styles.list1ContentImgLeft}>
                <Image style={styles.list1ContentImg} source={require("../images/kangyangzhongxin-2.png")}></Image>
              </View>
              <View style={styles.list1ContentRIght}>
                <View style={styles.list1ContentNameWrap}><Text style={styles.list1ContentName}>{item.name}</Text></View>
                <View style={styles.list1ContentAddressWrap}><Text style={styles.list1ContentAddress}>{item.address}</Text><View style={styles.list1ContentDistanceWrap}><Image style={styles.list1ContentDistanceImg} source={require("../images/address.png")}></Image><Text style={styles.list1ContentDistance}>{item.distance}</Text></View></View>
              </View>
            </View>
          }
        /> 
        <FlatList
          data={this.state.list}
          style={this.state.menuNum===1?styles.list1:styles.list2}
          renderItem={({ item }) =>
            <View style={styles.list1Content}>
              <View style={styles.list1ContentImgLeft}>
                <Image style={styles.list1ContentImg} source={require("../images/kangyangzhongxin-2.png")}></Image>
              </View>
              <View style={styles.list1ContentRIght}>
              <View style={styles.list1ContentNameWrap}><Text style={styles.list1ContentName}>{item.name}</Text></View>
              <View style={styles.list1ContentAddressWrap}><Text style={styles.list1ContentAddress}>{item.address}</Text><View style={styles.list1ContentDistanceWrap}><Image style={styles.list1ContentDistanceImg} source={require("../images/address.png")}></Image><Text style={styles.list1ContentDistance}>{item.distance}</Text></View></View>
              </View>
            </View>
          }
        /> 
        <FlatList
          data={this.state.list}
          style={this.state.menuNum===2?styles.list1:styles.list2}
          renderItem={({ item }) =>
            <View style={styles.list1Content}>
              <View style={styles.list1ContentImgLeft}>
                <Image style={styles.list1ContentImg} source={require("../images/kangyangzhongxin-2.png")}></Image>
              </View>
              <View style={styles.list1ContentRIght}>
              <View style={styles.list1ContentNameWrap}><Text style={styles.list1ContentName}>{item.name}</Text></View>
              <View style={styles.list1ContentAddressWrap}><Text style={styles.list1ContentAddress}>{item.address}</Text><View style={styles.list1ContentDistanceWrap}><Image style={styles.list1ContentDistanceImg} source={require("../images/address.png")}></Image><Text style={styles.list1ContentDistance}>{item.distance}</Text></View></View>
              </View>
            </View>
          }
        /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenier: {
    width: '100%',
    height: '100%'
  },
  header: {
    height: pxToDp(96),
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: pxToDp(36),
    color: "white"
  },
  menuTypes: {
    flexDirection: 'row',
    paddingLeft: pxToDp(34),
    paddingRight: pxToDp(34),
    justifyContent: "space-around",
    backgroundColor:'white'
  },
  menuItem: {
    position: 'relative',
    width: pxToDp(180),
    height: pxToDp(198),
    marginRight: pxToDp(60),
    alignItems: 'center'
  },
  menuItem3: {
    marginRight: 0,
  },
  menuImgWrap: {
    marginTop: pxToDp(40),
    width: pxToDp(83),
    height: pxToDp(83),
  },
  menuImg: {
    width: pxToDp(83),
    height: pxToDp(83), 
  },
  menuNameWrap: {
    height: pxToDp(70),
    justifyContent: 'center'
  },
  menuName: {
    fontSize: pxToDp(24),
    color: '#818181'
  },
  menuName1: {
    fontSize: pxToDp(24),
    color: '#11b57c'
  },
  line: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: pxToDp(3),
    backgroundColor: '#2abd89'
  },
  line1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: pxToDp(3),
  },
  list1: {
    marginTop: pxToDp(14),
    backgroundColor:"white",
  },
  list2: {
    display: "none"
  },
  list1Content: {
    marginTop: pxToDp(32),
    marginBottom: pxToDp(32),
    flexDirection: 'row',
    paddingLeft: pxToDp(22),
    paddingRight: pxToDp(22),
    alignItems: 'center'
    
  },
  list1ContentImgLeft: {
    marginLeft: pxToDp(10),
    marginRight: pxToDp(10),
    width: pxToDp(90),
    height: pxToDp(90),
    overflow: 'hidden'
  },
  list1ContentImg: {
    width: pxToDp(90),
    height: pxToDp(90),
  },
  list1ContentRIght: {
    flex: 1,
  },
  list1ContentName: {
    marginTop: pxToDp(20),
    marginBottom: pxToDp(20)
  },
  list1ContentName: {
    fontSize: pxToDp(28),
    color: '#010101'
  },
  list1ContentAddressWrap: {
    position: 'relative',
  },
  list1ContentAddress: {
    fontSize: pxToDp(24),
    color: '#a5a5a5'
  },
  list1ContentDistanceWrap: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  list1ContentDistanceImg: {
    width: pxToDp(18),
    height: pxToDp(22),
  },
  list1ContentDistance: {
    marginLeft: pxToDp(12),
    fontSize: pxToDp(24),
    color: '#a5a5a5',
  }
});
