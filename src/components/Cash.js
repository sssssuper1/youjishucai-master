import React, { Component } from 'react';
import Header1 from './Header1';
import store from '../store/index';
import Toast from 'react-native-easy-toast';
import Fetch from '../js/fetch';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class Cash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cash: 0,
      fee: 0,
      sum: 0,
      balance: store.getState().balance
    }
  }

  cashInput(text) {
    let cash = Number(text);
    if (cash == NaN || cash < 0) return;

    let fee = Number((cash * -0.05).toFixed(2));
    this.setState({
      cash: cash,
      fee: fee,
      sum: cash + fee
    });
  }

  submit() {
    const cash = Number(this.state.cash);
    if (!cash || cash == NaN || cash <= 0) return;

    if (this.state.cash > this.state.balance) {
      this.refs.toast.show('余额不足!');
      return;
    }

    const params = {
      money: cash
    }

    Fetch(global.url + '/api/Balance/TransferToBank', 'post', params, (res) => {
      if (res.result) {
        this.refs.toast.show('提现申请已提交!');

        setTimeout(() => {
          this.props.navigation.navigate('Home', { selectedTab: 'My' });
        }, 1500);
      } else {
        Alert.alert('提示', res.errMsg);
      }
    }, (err) => {
      Alert.alert('提示', err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header1 navigation={this.props.navigation} name="提现" />
        <View style={[styles.tableContainer, styles.tableDivision]}>
          <View style={styles.amountTitle}>
            <Text style={styles.textBlack}>余额提现</Text>
          </View>
          <TextInput
            keyboardType={'numeric'}
            style={styles.inputField}
            underlineColorAndroid={'transparent'}
            onChangeText={(text) => this.cashInput(text)}
            placeholderTextColor={'#a6a6a6'}
          />
        </View>
        <View style={[styles.cell, styles.tableDivision]}>
          <Text style={styles.textInfo}>当前账户余额</Text>
          <Text style={styles.textInfo}>{this.state.balance}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.textInfo}>提现需要扣除5%手续费</Text>
          <Text style={[styles.amount, styles.textRed]}>{this.state.fee}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.textInfo}>实际提现到账</Text>
          <Text style={[styles.amount, styles.textGreen]}>{this.state.sum}</Text>
        </View>
        <View style={styles.cellContainer}>
          <TouchableOpacity style={styles.btn} onPress={this.submit.bind(this)}>
            <Text style={styles.btnText}>确认提现</Text>
          </TouchableOpacity>
        </View>
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
  tableContainer: {
    paddingHorizontal: pxToDp(34),
    paddingTop: pxToDp(40),
    paddingBottom: pxToDp(30),
    backgroundColor: 'white'
  },
  tableDivision: {
    marginTop: pxToDp(15),
  },
  amountTitle: {
    flexDirection: 'row'
  },
  textBlack: {
    color: '#000000'
  },
  textGreen: {
    color: "#2abd89"
  },
  textRed: {
    color: '#ff0036'
  },
  inputField: {
    color: '#2bbd89',
    fontSize: pxToDp(46),
    fontWeight: 'bold'
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
  amount: {
    fontSize: pxToDp(28),
    fontWeight: 'bold',
    lineHeight: pxToDp(34)
  },
  btn: {
    width: '100%',
    height: pxToDp(88),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2abd89',
    borderRadius: pxToDp(4)
  },
  btnText: {
    fontSize: pxToDp(32),
    color: 'white'
  },
  toast:{
    backgroundColor: '#626262'
  }
});