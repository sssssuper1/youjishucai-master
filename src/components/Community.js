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
      lists: [[], [], []],
      detailList: []
    }

    this.loadData(0);
  }

  loadData(id) {
    let lists = this.state.lists;
    if (lists[id].length == 0) {
      Fetch(global.url + '/api/home/GetShopList?categoryName=' + id, 'get', null, (res) => {
        if (res.result) {
          lists[id] = res.data;
          this.setState({
            lists: lists,
            detailList: lists[id],
            menuNum: id
          });
        } else {
          alert(res.errMsg)
        }
      }, (err) => {
        Alert.alert('提示', '网路错误!');
      })
    } else {
      this.setState({
        menuNum: id,
        detailList: lists[id],
      })
    }
  }

  render() {
    return (
      <View style={styles.contenier}>  
        <Header name="正弘新社群"></Header>
        <View style={styles.menuTypes}>
          <TouchableOpacity style={styles.menuItem} onPress={() => { 
            this.loadData(0)
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
            this.loadData(1)
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
            this.loadData(2)
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
          data={this.state.detailList}
          style={styles.list1}
          renderItem={({ item }) =>
            <View style={styles.list1Content}>
              <View style={styles.list1ContentImgLeft}>
                <Image style={styles.list1ContentImg} source={{uri: item.image}}></Image>
              </View>
              <View style={styles.list1ContentRIght}>
                <View style={styles.list1ContentNameWrap}><Text style={styles.list1ContentName}>{item.name}</Text></View>
                <View style={styles.list1ContentAddressWrap}><Text style={styles.list1ContentAddress}>{item.address}</Text><View style={styles.hidden}><Image style={styles.list1ContentDistanceImg} source={require("../images/address.png")}></Image><Text style={styles.list1ContentDistance}>{item.distance}</Text></View></View>
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
  hidden: {
    display: 'none'
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
  },
  list2: {
    display: "none"
  },
  list1Content: {
    backgroundColor:"white",
    paddingTop: pxToDp(32),
    paddingBottom: pxToDp(32),
    flexDirection: 'row',
    paddingLeft: pxToDp(22),
    paddingRight: pxToDp(22),
    alignItems: 'center',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#eeeeee'
  },
  list1ContentImgLeft: {
    marginLeft: pxToDp(10),
    marginRight: pxToDp(10),
    width: pxToDp(140),
    height: pxToDp(100),
    overflow: 'hidden'
  },
  list1ContentImg: {
    width: pxToDp(140),
    height: pxToDp(100),
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
