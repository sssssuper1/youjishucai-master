import React, { Component } from 'react';
import Header1 from './Header1';
import PayPassword from './PayPassword';
import store from '../store/index';
import Fetch from '../js/fetch';
import Toast from 'react-native-easy-toast';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class ShopPay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payIntegral: 0,
      sumIntegral: store.getState().integral,
      isSubmitting: false,
      inputPassword: false
    }
  }

  openModal() {
    const integral = Number(this.state.payIntegral);
    if (integral == NaN || integral <= 0) return;

    this.setState({
      inputPassword: true
    })
  }

  closeModal() {
    this.setState({
      inputPassword: false
    })
  }

  payInput(text) {
    this.setState({
      payIntegral: text
    });
  }

  submit(password) {
    const integral = Number(this.state.payIntegral);

    if (integral > this.state.sumIntegral) {
      this.refs.toast.show('积分不足!');
      return;
    }

    this.setState({
      isSubmitting: true
    });

    let params = {
      storeId: this.props.navigation.state.params.id,
      integral: this.state.payIntegral,
      payPwd: password
    }

    Fetch(global.url + '/api/store/AddRecord', 'post', params, (res) => {
      this.setState({
        isSubmitting: false
      });

      if (res.result) {
        // this.refs.toast.show('付款成功!');
        // setTimeout(() => {
        //   this.props.navigation.replace('CommunityOrders');
        // }, 1000);

        this.props.navigation.navigate('PaySuccess', {
          payAmount: this.state.payIntegral,
          orderType: 2
        });
      } else {
        Alert.alert('提示', res.errMsg);
      }
    }, (err) => {
      Alert.alert('提示', err);
      this.setState({
        isSubmitting: false
      });
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header1 navigation={this.props.navigation} name="买单" />
        <View style={styles.cellContainer}>
          <View style={styles.inputCell}>
            <Text style={styles.titleText}>积分消费:</Text>
            <TextInput
              keyboardType={Platform.OS == 'ios' ? 'numbers-and-punctuation' : 'numeric'}
              style={styles.payInputField}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.payInput(text)}
              placeholder={'询问服务员后输入'}
              placeholderTextColor={'#a6a6a6'}
            />
          </View>
        </View>
        <View style={styles.cell}>
          <Text style={styles.textInfo}>可用积分</Text>
          <Text style={styles.textInfo}>{this.state.sumIntegral}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.textInfo}>实付积分</Text>
          <Text style={styles.integral}>{this.state.payIntegral}</Text>
        </View>
        <View style={styles.cellContainer}>
          <TouchableOpacity
            style={[styles.btn, this.state.isSubmitting ? styles.btnDisabled : styles.btnEnabled]}
            onPress={this.openModal.bind(this)} disabled={this.state.isSubmitting}>
            <Text style={styles.btnText}>{this.state.isSubmitting ? '支付中' : '确认买单'}</Text>
          </TouchableOpacity>
        </View>
        <PayPassword visible={this.state.inputPassword} close={this.closeModal.bind(this)} submit={this.submit.bind(this)} />
        <Toast ref="toast" style={styles.toast} position="top" positionValue={pxToDp(400)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  cellContainer: {
    paddingLeft: pxToDp(34),
    paddingRight: pxToDp(34),
    paddingTop: pxToDp(37),
    paddingBottom: pxToDp(37)
  },
  inputCell: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: pxToDp(108),
    paddingLeft: pxToDp(24),
    paddingRight: pxToDp(24),
    backgroundColor: '#ffffff',
    borderRadius: pxToDp(4)
  },
  titleText: {
    fontSize: pxToDp(32),
    fontWeight: '600'
  },
  payInputField: {
    flex: 1,
    height: '100%',    
    textAlign: 'right',
    color: '#2bbd89',
    fontSize: pxToDp(32)
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: pxToDp(34),
    paddingRight: pxToDp(34),
    height: pxToDp(107),
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#eeeeee',
    backgroundColor: "white",
  },
  textInfo: {
    fontSize: pxToDp(28),
    lineHeight: pxToDp(34),
    color: '#a9a9a9'
  },
  integral: {
    fontSize: pxToDp(28),
    lineHeight: pxToDp(34),
    color: '#2bbd89'
  },
  btn: {
    width: '100%',
    height: pxToDp(88),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: pxToDp(4)
  },
  btnEnabled: {
    backgroundColor: '#2abd89',
  },
  btnDisabled: {
    backgroundColor: '#d0d0d0'
  },
  btnText: {
    fontSize: pxToDp(32),
    color: 'white'
  },
  toast:{
    backgroundColor: '#626262'
  }
});