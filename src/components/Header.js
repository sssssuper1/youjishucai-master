/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>  
        <ImageBackground style={styles.header} source={require('../images/headerBackground.png')} resizeMode='cover'>
          <Text style={styles.headerText}>{this.props.name}</Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        height: pxToDp(124),
        paddingTop: pxToDp(28)
      },
      android: {
        height: pxToDp(96),
      }
    })
  },
  headerText: {
    fontSize: pxToDp(36),
    color: "white"
  },
});
