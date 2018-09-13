/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class Fonter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity disabled={this.props.disabled} onPress={this.props.onPress} style={styles.btn}>
        <Text style={styles.btnText}>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    marginTop:pxToDp(34),
    width: '100%',
    height: pxToDp(88),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2abd89'
  },
  btnText: {
    fontSize: pxToDp(32),
    color: 'white'
  },
});
