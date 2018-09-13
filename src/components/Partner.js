import React, { Component } from 'react';
import Fetch from '../js/fetch'
import Header1 from './Header1.js'
import getVipPortrait from '../js/getVipPortrait';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class Partner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }

    this.loadData();
  }

  loadData() {
    Fetch(global.url + '/api/user/GetReferrer', 'get', null, (res) => {
      if (res.result) {
        this.setState({
          data: res.data
        })
      } else {
        Alert.alert('提示', res.errMsg);
      }
    }, (err) => {
      Alert.alert('提示', err);
    });
  }

  _renderCell(item, index) {
    return (
      <View style={styles.listCell} key={index}>
        <View>
          <Image style={styles.headPortrait} source={getVipPortrait(item.level)} />
        </View>
        <View style={styles.partnerInfo}>
          <Text style={[styles.font26, styles.textBlack]}>{item.name}</Text>
          <Text style={[styles.font24, styles.textGrey]}>联系方式: {item.phone}</Text>
          <Text style={[styles.font24, styles.textGrey]}>VIP等级: {item.levelName}</Text>
          <Text style={[item.upgradeLevelTime ? styles.font24 : styles.hidden, styles.textGrey]}>成为VIP时间: {item.upgradeLevelTime}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header1 navigation={this.props.navigation} name="我的分享" />
        <FlatList
          data={this.state.data}
          renderItem={({item, index}) => this._renderCell(item, index)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  hidden: {
    display: 'none'
  },
  listCell: {
    marginTop: pxToDp(15),
    flexDirection: 'row',
    paddingVertical: pxToDp(33),
    paddingHorizontal: pxToDp(26),
    backgroundColor: '#ffffff'
  },
  headPortrait: {
    width: pxToDp(108),
    height: pxToDp(108),
    borderRadius: pxToDp(54)
  },
  partnerInfo: {
    paddingLeft: pxToDp(26)
  },
  font26: {
    fontSize: pxToDp(26)
  },
  font24: {
    fontSize: pxToDp(24),
    lineHeight: pxToDp(38)
  },
  textBlack: {
    color: '#000000'
  },
  textGrey: {
    color: '#a7a7a7'
  }
})