import React, { Component } from 'react';
import pxToDp from '../js/pxToDp';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native';
import md5 from 'js-md5';

export default class PayPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ''
    }
  }

  input(value) {
    if (this.state.password.length >= 6) return;

    const password = this.state.password + value.toString();

    this.setState({
      password: password
    });

    if (password.length === 6) {
      const pw = md5(password);
      
      this.setState({
        password: ''
      });

      this.props.submit(pw);
      this.props.close();
    }
  }

  delete() {
    const password = this.state.password;
    this.setState({
      password: password.substr(0, password.length -1)
    });
  }

  inputCellRender(swither) {
    return (
      <View style={styles.inputCell}>
        <Text allowFontScaling={false} style={this.state.password.length > swither ? styles.maskDiot : styles.hidden}>●</Text>
      </View>
    )
  }

  inputKeyRender(value) {
    return (
      <TouchableOpacity style={styles.key} onPress={this.input.bind(this, value)}>
        <Text allowFontScaling={false} style={styles.keyText}>{value}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const switchers = [0, 1, 2, 3, 4, 5];
    const inputCells = switchers.map((value) => this.inputCellRender(value))
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.props.visible}>
        <View style={styles.container}>
          <View style={styles.modelWrap}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.headerGoBack} onPress={() => this.props.close()}>
                <Image style={styles.headerImg} source={require('../images/orderDir.png')}></Image>
              </TouchableOpacity>
              <Text style={styles.headerText}>输入支付密码</Text>
            </View>
            <View style={styles.inputFieldContainer}>
              <View style={styles.inputField}>
                {inputCells}
              </View>
            </View>
            <View style={styles.keyboard}>
              <View style={styles.keyRow}>
                {[1, 2, 3].map((value) => this.inputKeyRender(value))}
              </View>
              <View style={styles.keyRow}>
                {[4, 5, 6].map((value) => this.inputKeyRender(value))}
              </View>
              <View style={styles.keyRow}>
                {[7, 8, 9].map((value) => this.inputKeyRender(value))}
              </View>
              <View style={styles.keyRow}>
                {['', 0].map((value) => this.inputKeyRender(value))}
                <TouchableOpacity style={styles.key} onPress={this.delete.bind(this)}>
                  <Image style={styles.delete} source={require('../images/delete.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '100%',
    width: '100%'
  },
  hidden: {
    display: 'none',
  },
  modelWrap: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // backgroundColor: '#ffffff'
  },
  header: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToDp(96),
    backgroundColor: '#ffffff',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#eeeeee'
  },
  headerGoBack: {
    position: 'absolute',
    left: pxToDp(16),
    width: pxToDp(50),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerImg: {
    width: pxToDp(24),
    height: pxToDp(40)
  },
  headerText: {
    fontSize: pxToDp(36),
    color: '#020202'
  },
  inputFieldContainer: {
    backgroundColor: '#f6f6f6'
  },
  inputField: {
    marginTop: pxToDp(34),
    marginBottom: pxToDp(150),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  inputCell: {
    height: pxToDp(110),
    width: pxToDp(110),
    backgroundColor: '#ffffff',
    borderWidth: pxToDp(1),
    borderColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center'
  },
  maskDiot: {
    fontSize: pxToDp(38)
  },
  keyboard: {
    backgroundColor: '#ffffff'
  },
  keyRow: {
    flexDirection: 'row',
  },
  key: {
    flex: 1,
    height: pxToDp(97),
    borderWidth: pxToDp(1),
    borderColor: '#c1c5ca',
    alignItems: 'center',
    justifyContent: 'center'
  },
  keyText: {
    fontSize: pxToDp(40)
  },
  delete: {
    width: pxToDp(42),
    height: pxToDp(42)
  }
})