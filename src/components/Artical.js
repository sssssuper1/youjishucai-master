import React, { Component } from 'react';
import Header1 from './Header1.js';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  WebView,
  ScrollView
} from 'react-native';
import pxToDp from '../js/pxToDp';

const BaseScript =`
  (function () {
      var height = 0;
      function changeHeight() {
        if (document.body.scrollHeight != height) {
          height = document.body.scrollHeight;
          window.postMessage(height);
        }
      }
      var flag = setInterval(changeHeight, 500);
  } ())
`

export default class Artical extends Component {
  constructor(props) {
    super(props);

    this.state={
      WebViewHeight: 0,
    }
  }

  webViewLoaded = () => {
    this.refs.webview.injectJavaScript(`
        (function() {
          height = document.body.scrollHeight;
          window.postMessage(height);
          clearInterval(flag);
        }())
    `);
  }

  handleMessage(e) {
    this.setState({
      WebViewHeight: e.nativeEvent.data
    });
  }

  render() {
    return (
      <View style={styles.container} >
        <Header1 navigation={this.props.navigation} name="文章"></Header1>
        <ScrollView style={{flex: 1}}>
          <WebView
            ref={'webview'}
            source={{uri: this.props.navigation.state.params.url}}
            style={{
              height: Number(this.state.WebViewHeight),
              marginTop: pxToDp(15),
              backgroundColor: 'white',
            }}
            injectedJavaScript={BaseScript}
            onLoadEnd={this.webViewLoaded}
            onMessage={(e)=>this.handleMessage(e)}
            javaScriptEnabled={true}
            automaticallyAdjustContentInsets={true}
            scalesPageToFit={true}>
          </WebView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff'
  },
  hidden: {
    display: 'none'
  }
});
