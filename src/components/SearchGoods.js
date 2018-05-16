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
import Header1 from './Header1'
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
  FlatList,
  Picker
} from 'react-native';
import pxToDp from '../js/pxToDp';
const deviceHeightDp = Dimensions.get('window').height;
const deviceWidthDp = Dimensions.get('window').width;
function scrrollHeight(uiElementHeight) {
  alert(deviceHeightDp-uiElementHeight)  
  return deviceHeightDp-uiElementHeight;
}

type Props = {};
export default class SearchGoods extends Component<Props> {
  constructor(props) {
    super(props);
    this.state={
      RightdataSource: type2.cloneWithRows([]),
    }
  }
   //二级菜单的list渲染
   _renderRow2(rowData, sectionID, rowID) {
    return (
      <View style={styles.rowGoods}>
        <View >
          <Image style={styles.rowGoodsImg} source={require('../images/banner1.jpg')}/>
        </View>
        <View ><Text style={styles.rowGoodsName}>{rowData.name}</Text></View>
        <View style={styles.rowGoodsMoneyAndAdd}>
          <View style={styles.rowGoodsMoney}><Text style={styles.rowGoodsSymbol}>¥</Text><Text style={styles.rowGoodsNum}>{rowData.money}</Text><Text style={styles.rowGoodsCompany}>/{rowData.company}</Text></View>
          <View style={styles.rowGoodsAdd} {...this._panResponder.panHandlers}><Image style={styles.rowGoodsAddImg} source={require('../images/addGood.png')}/></View>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.contenier}>  
        <View style={styles.header}>
          <Image style={styles.headerImg} source={require('../images/orderDir.png')}></Image>
          <View style={styles.headerSearchWrap}>
            <Image style={styles.headerSearchImg} source={require("../images/search.png")}></Image>  
            <TextInput
              returnKeyType={"search"}
              style={styles.headerSearch}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({searchText:text})}
              placeholder={'有机大米'}
              placeholderTextColor={'#a6a6a6'}
            />
          </View>
          <TouchableOpacity style={styles.cart}>
            <Image style={styles.cartImg} source={require('../images/searchCart.png')}></Image>
            <Text style={styles.cartNum}>100</Text>
          </TouchableOpacity>
        </View>
        <ListView 
          contentContainerStyle={styles.goods3}
          dataSource={this.state.RightdataSource}
          renderRow={this._renderRow2.bind(this)}
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
  header:{
    position: 'relative',
    height: pxToDp(96),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  headerImg:{
    position: 'absolute',
    left: pxToDp(34),
    width: pxToDp(24),
    height: pxToDp(40),
    zIndex: 100,
  },
  headerText: {
    fontSize: pxToDp(36),
    color: '#020202'
  },
  headerSearchWrap: {
    position: "relative",
    flex: 1,
    height: pxToDp(63),
    marginLeft: pxToDp(98),
    justifyContent: "center",
  },
  headerSearchImg: {
    position: 'absolute',
    left: pxToDp(30),
    zIndex: 100,
    margin: "auto",
    width: pxToDp(36),
    height: pxToDp(36)
  },
  headerSearch: {
    borderColor: '#ececec',
    borderWidth: 1,
    borderRadius: 36,
    backgroundColor: "#eeeeee",
    height: "100%",
    paddingLeft: pxToDp(74),
  },
  cart:{
    position: 'relative',
    marginRight: pxToDp(12),
    width: pxToDp(92),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cartImg:{
    width: pxToDp(52),
    height: pxToDp(42)
  },
  cartNum:{
    position: 'absolute',
    right: 0,
    top: pxToDp(17),
    width: pxToDp(42),
    height: pxToDp(24),
    fontSize: pxToDp(20),
    color: 'white',
    borderRadius: pxToDp(30),
    backgroundColor: '#fd4448'
  },
  goods3: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});
