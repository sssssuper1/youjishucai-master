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
import Toast, {DURATION} from 'react-native-easy-toast';
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
  Modal,
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
export default class Message extends Component<Props> {
  constructor(props) {
    super(props);
    this.state={
      modelVistibal:true,
      name: ''
    }
    
  }
  show(){
    this.refs.toast.show('hello world!');
  }
  _render(item){
    return(
      <View style={styles.list}>
          <View style={styles.date}><View style={styles.dateContent}><Text style={styles.dateContentText}>4月20</Text></View></View>
          <TouchableOpacity style={styles.btn}>
            <View style={styles.message}>
              <View style={styles.messageImgWrap}><Image style={styles.messageImg} source={require('../images/message.jpg')}></Image></View>
              <View style={styles.messageContent}>
                <View style={styles.title}><Text style={styles.titleContent}>物流通知</Text></View>
                <View ><Text style={styles.p}>五一节到了快迪欧飞机火车就看见我，大胃
发我我的娃胃王的发我我的娃五一节到了</Text></View>
              </View> 
            </View>
            <View style={styles.seeDetail}>
              <View style={styles.goSeeDetail}><Text style={styles.goSeeDetailTitle}>查看详情</Text><Image style={styles.goSeeDetailDir} source={require('../images/rightDir.png')}></Image></View>
            </View>
          </TouchableOpacity>
        </View>
    )
  }
  render() {
    return (
      <View style={styles.contenier} >
        <Header1 name="系统消息"></Header1>
        <FlatList
          data={[{key: 'a'}, {key: 'b'}]}
          renderItem={({item}) => this._render(item)}
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
  date: {
    height: pxToDp(92),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContent: {
    width: pxToDp(116),
    height: pxToDp(40),
    borderRadius: pxToDp(4),
    backgroundColor:'#dcdcdc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContentText: {
    fontSize: pxToDp(24),
    color: 'white'
  },
  message: {
    flexDirection: 'row',
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#f1f1f1'
  },
  messageImgWrap: {
    width: pxToDp(140),
    height: pxToDp(182),
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    marginLeft: pxToDp(26),
    marginRight: pxToDp(26),
    backgroundColor: 'white',
    borderRadius: pxToDp(10),
  },
  messageImg: {
    width: pxToDp(84),
    height: pxToDp(84)
  },
  messageContent: {
    flex:1,
    height: pxToDp(182),
    justifyContent: 'center',
  },
  title: {
  },
  titleContent: {
    fontSize: pxToDp(32)
  },
  p:{
    fontSize: pxToDp(28),
    color: '#9f9f9f'
  },
  seeDetail: {
    position: 'relative',
    height: pxToDp(76),
    justifyContent: 'center'
   },
  goSeeDetail: {
    position: 'absolute',
    right: pxToDp(26),
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  goSeeDetailTitle: {
    fontSize: pxToDp(24),
    color: '#2abd89'
  },
  goSeeDetailDir: {
    marginLeft: pxToDp(16),
    width: pxToDp(12),
    height: pxToDp(22)
  }
});
