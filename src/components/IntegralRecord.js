/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Fetch from '../js/fetch'
import Header1 from './Header1.js'
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

export default class IntegralRecord extends Component {
  constructor(props) {
    super(props);
    this.isLoad = false;
    this.state = {
      dataSource: [],
      showAlert: false,
    };

    this.loadData();
  }

  loadData() {
    this.isLoad = true;
    let params = {
      pageIndex: 0,
      pageSize: 10000
    }
    Fetch(global.url + '/API/user/GetIntegralList', 'post', params,
      (responseData) => {
        this.isLoad = false;
        if (responseData.result) {
          this.setState({
            dataSource: responseData.data.list
          })
          this.hideAlert();
        }
      },
      (err) => {
        this.hideAlert();
        Alert.alert('提示',err);
      }
    );

    setTimeout(() => {
      if (this.isLoad) {
        this.setState({
          showAlert: true
        })
      }
    }, 1500);
  }

  hideAlert() {
    this.setState({
      showAlert: false
    });
  }

  _renderRow(item, index) {
      return (
        <View style={styles.goods1}>
          <View style={styles.order}>
            <Text style={styles.orderText}>订单号</Text>
            <Text style={styles.orderNum}>{item.orderNum != '' ? item.orderNum : item.fromOrderNum}</Text>
            <Text style={styles.state}>{item.createTime}</Text>
          </View>
          <View style={styles.orderSum}>
            <Text style={styles.orderRemark}>{item.remark}</Text>
            <Text style={item.integral >= 0?styles.plus:styles.reduce}>{item.integral >= 0? '+':''}{item.integral}</Text>
          </View>
        </View> 
      );
  }
  render() {
    const { state } = this.state;
    const { navigate } = this.props.navigation;

    let view;
    if (this.state.dataSource.length > 0) {
      view =
      <FlatList 
        data={this.state.dataSource}
        renderItem={({ item, index }) =>this._renderRow(item, index)}
      />
    } else if(!this.state.showAlert && !this.isLoad) {
      view =
        <View style={styles.stateBlank}>
          <View style={styles.stateImgWrap}>
            <Image style={styles.stateImg} source={require('../images/noOrder.png')}></Image>
          </View>
          <View style={styles.stateShow}><Text style={styles.stateShowText}>您还没有相关记录</Text></View>
        </View>;
    }
    return (
      <View style={styles.contenier}>
        <Header1 navigation={this.props.navigation} name="积分记录"></Header1>
          {view}
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={true}
          closeOnHardwareBackPress={false}
          closeOnTouchOutside={false}
          title='Loading..'
          progressSize='small'
          progressColor='gray'
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
  goods1:{
    marginTop: pxToDp(15),
    backgroundColor: 'white',
  },
  list: {
    paddingLeft: pxToDp(26),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#eeeeee',
    height: pxToDp(240)
  },
  order: {
    position: 'relative',
    height: pxToDp(79),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#eeeeee',
    backgroundColor: 'white',
  },
  orderText: {
    marginLeft: pxToDp(26),
    fontSize: pxToDp(24),
    color: '#a2a2a2'
  },
  orderNum: {
    marginLeft: pxToDp(12),
    fontSize: pxToDp(24),
    color: '#2b2b2b'
  },
  state: {
    position: 'absolute',
    fontSize: pxToDp(24),
    right: pxToDp(26),
    color: '#a2a2a2',
  },
  orderSum: {
    position: 'relative',
    height: pxToDp(103),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: pxToDp(1),
    borderTopColor: '#f1f1f1',
    backgroundColor: 'white',
    paddingLeft: pxToDp(26),
    paddingRight: pxToDp(26)
  },
  orderRemark: {
    fontSize: pxToDp(36)
  },
  plus: {
    fontSize: pxToDp(36),
    color: '#fe0036'
  },
  reduce: {
    fontSize: pxToDp(36),
    color: '#15b97d'
  },
  stateBlank: {
    width: '100%',
    height: pxToDp(537),
    alignItems: 'center',
    justifyContent: 'center'
  },
  stateImgWrap: {
    marginTop: pxToDp(60)
  },
  stateImg: {
    width: pxToDp(253),
    height: pxToDp(270)
  },
  stateShow: {
    marginTop:pxToDp(50),
  },
});
