import React, { Component } from 'react';
import Header1 from './Header1';
import PayPassword from './PayPassword';
import Fetch from '../js/fetch';
import getVipPortrait from '../js/getVipPortrait';
import Toast from 'react-native-easy-toast';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class TransferConfirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cash: 0,
      inputPassword: false,
      isSubmitting: false,
      balance: props.navigation.state.params.userInfo.balance
    }
  }

  openModal() {
    const cash = Number(this.state.cash);
    if (!cash || cash == NaN || cash <= 0) return;

    this.setState({
      inputPassword: true
    })
  }

  closeModal() {
    this.setState({
      inputPassword: false
    })
  }

  submit(payPwd) {
    if (this.state.cash > this.state.balance) {
      this.refs.toast.show('余额不足!');
      return;
    }

    this.setState({
      isSubmitting: true
    });

    const params = {
      toCustomerId: this.props.navigation.state.params.userInfo.id,
      payPwd: payPwd,
      money: this.state.cash
    }

    Fetch(global.url + '/api/Balance/TransferToOther', 'post', params, (res) => {
      this.setState({
        isSubmitting: false
      });
      if (res.result) {
        this.refs.toast.show('转账成功!');
        setTimeout(() => {
          this.props.navigation.navigate('Home', { selectedTab: 'my' });
        }, 1500);
      } else {
        Alert.alert('提示', res.errMsg);
      }
    }, (err) => {
      this.setState({
        isSubmitting: false
      });
      Alert.alert('提示', err);
    })
  }

  render() {
    const { phone, name, level } = this.props.navigation.state.params.userInfo;
    return (
      <View style={styles.container}>
        <Header1 navigation={this.props.navigation} name="余额转账" />
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View style={styles.payeeInfo}>
            <Image style={styles.headPortrait} source={getVipPortrait(level)} />
            <Text style={styles.payeeName}>{name}</Text>
            <Text style={styles.payeeID}>ID: {phone}</Text>
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.amountTitle}>
              <Text style={styles.textBlack}>余额转账</Text>
            </View>
            <TextInput
              keyboardType={Platform.OS == 'ios' ? 'numbers-and-punctuation' : 'numeric'}
              style={styles.inputField}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({cash: text})}
              placeholderTextColor={'#a6a6a6'}
            />
          </View>
          <View style={[styles.cell, styles.tableDivision]}>
            <Text style={styles.textInfo}>当前账户余额</Text>
            <Text style={styles.textInfo}>{this.state.balance}</Text>
          </View>
          <View style={styles.cellContainer}>
            <TouchableOpacity
              style={[styles.btn, this.state.isSubmitting ? styles.btnDisabled : styles.btnEnabled]}
              onPress={this.openModal.bind(this)}
              disabled={this.state.isSubmitting}>
              <Text style={styles.btnText}>{this.state.isSubmitting ? '转账中' : '确认转账'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  payeeInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    paddingVertical: pxToDp(55)
  },
  headPortrait: {
    width: pxToDp(134),
    height: pxToDp(134),
    borderRadius: pxToDp(67),
    marginBottom: pxToDp(17),
    // backgroundColor: '#d8d8d8'
  },
  payeeName: {
    color: '#000000',
    fontSize: pxToDp(33)
  },
  payeeID: {
    color: '#a7a7a7',
    fontSize: pxToDp(26)
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
  payInputField: {
    flex: 1,
    height: '100%',    
    textAlign: 'right',
    color: '#000000',
    fontSize: pxToDp(28)
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
  payTitle: {
    fontSize: pxToDp(28),
    lineHeight: pxToDp(34),
    color: '#000000'
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