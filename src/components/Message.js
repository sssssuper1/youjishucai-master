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
import Header1 from './Header1.js'
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

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state={
      modelVistibal:true,
      name: '',
      messages: [
        {
          date: '4月20日',
          title: '物流通知',
          contents: '哈哈哈哈哈哈哈哈哈',
          isNews: true
        },
        {
          date: '4月15日',
          title: '春暖花开有机食品节',
          contents: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈,哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈,哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          isNews: false
        }
      ]
    }
  }
  _render(item) {
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.list}>
        <View style={styles.date}><View style={styles.dateContent}><Text style={styles.dateContentText}>{item.date}</Text></View></View>
        <TouchableOpacity style={styles.btn} onPress={() => {navigate('MessageDetail')}}>
          <View style={styles.message}>
            <View style={styles.messageImgWrap}><Image style={styles.messageImg} source={require('../images/message.png')}></Image></View>
            <View style={styles.messageContent}>
              <View style={styles.title}><Text style={styles.titleContent}>{item.title}</Text></View>
              <View style={styles.contents}>
                <Text numberOfLines={2} style={styles.p}>{item.contents}</Text>
              </View>
            </View> 
          </View>
          <View style={styles.seeDetail}>
            <View style={styles.goSeeDetail}>
              <Text style={item.isNews ? styles.goSeeDetailTitle : styles.outOfDate}>
                {item.isNews ? '查看详情' : '已过期'}
              </Text>
              <Image style={styles.goSeeDetailDir} source={require('../images/rightDir.png')}></Image>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    const { navigate } = this.props.navigation;
    let view;
    if (this.state.messages.length > 0) {
      view = 
      <FlatList
          data={this.state.messages}
          renderItem={({item}) => this._render(item)}
        />  
    } else {
      view =
        <View style={styles.state}>
          <View style={styles.stateImgWrap}>
            <Image style={styles.stateImg} source={require('../images/noMessage.png')}></Image>
          </View>
          <View style={styles.stateShow}><Text style={styles.stateShowText}>您还没有消息通知</Text></View>
          <TouchableOpacity style={styles.stateButton} onPress={() => navigate('Home', {selectedTab: 'home'})}>
            <Text>去逛逛</Text>
          </TouchableOpacity>
        </View>  
    }
    return (
      <View style={styles.contenier} >
        <Header1 navigation={this.props.navigation} name="系统消息"></Header1>
        {view}       
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
    borderBottomColor: '#eeeeee'
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
    paddingTop: pxToDp(10)
  },
  contents: {
    marginTop: pxToDp(10),
    height: pxToDp(90)
  },
  titleContent: {
    fontSize: pxToDp(32)
  },
  p:{
    fontSize: pxToDp(28),
    lineHeight: pxToDp(40),
    color: '#9f9f9f',
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
  outOfDate: {
    fontSize: pxToDp(24),
    color: '#9f9f9f'
  },
  goSeeDetailDir: {
    marginLeft: pxToDp(16),
    width: pxToDp(12),
    height: pxToDp(22)
  },
  state: {
    width: '100%',
    height: pxToDp(537),
    alignItems: 'center',
    justifyContent: 'center'
  },
  stateImgWrap: {
    marginTop: pxToDp(200)
  },
  stateImg: {
    width: pxToDp(253),
    height: pxToDp(270)
  },
  stateShow: {
    marginTop:pxToDp(50),
  },
  stateButton: {
    marginTop: pxToDp(40),
    width: pxToDp(200),
    paddingTop: pxToDp(8),
    paddingBottom: pxToDp(8),
    borderWidth: pxToDp(1),
    borderColor: '#a9a9a9',
    borderRadius: pxToDp(10),
    alignItems: 'center'
  },
});
