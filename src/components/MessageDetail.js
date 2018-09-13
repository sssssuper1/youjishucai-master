/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Header1 from './Header1.js'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class MessageDetail extends Component {
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
  render() {
    return (
      <View style={styles.contenier} >
        <Header1 navigation={this.props.navigation} name="详情页"></Header1>
        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.titleText}>标题标题标题标题标题标题</Text>
          </View>
          <View style={styles.date}><Text>2017-03-06</Text></View>
          <View><Text style={styles.section}>正文正文正文先看整体布局，寻找出整体布局的层级关系；
  正确的理解原作想要传达的重要信息，抓住原作的特征；
  c. 通过测量原作的每个元素的大小比例找到元素组合的关
  系；d. 吸取原作的色彩组合，分析这些配色在色环上的位
  置关系；e. 如果是拟物图标注意把控光影之间的变化。</Text></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenier: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  content:{
    paddingLeft: pxToDp(34),
    paddingRight: pxToDp(34)
  },
  title: {
    marginTop: pxToDp(43)
  },
  titleText: {
    fontSize: pxToDp(48),
    color: '#2b2b2b'
  },
  date: {
    fontSize: pxToDp(28),
    height: pxToDp(80),
    justifyContent: 'center',
    color: '#a9a9a9'
  },
  section:{
    fontSize: pxToDp(28),
    color: '#2b2b2b'
  }
});
