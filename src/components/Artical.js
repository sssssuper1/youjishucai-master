import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
  WebView,
  ScrollView,
  Modal
} from 'react-native';
import pxToDp from '../js/pxToDp';
import CookieManager from 'react-native-cookies';
import { wxShareToSession, wxShareToTimeline } from '../js/wxShare';

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
      isLogin: false,
      isShare: false
    }

    CookieManager.get(global.url).then(cookie => {
      if (!!cookie.userId) {
        this.setState({
          isLogin: true
        })
      }
    })
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

  share(type) {
    this.setState({
      isShare: false
    })
    const { url, title } = this.props.navigation.state.params;
    let data = {
      type: 'news',
      webpageUrl: url,
      title: title
    }

    if (type === 1) {
      wxShareToSession(data);
    } else if (type === 2) {
      wxShareToTimeline(data);
    }
  }

  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container} >
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerGoBack} onPress={() => goBack()}>
            <Image style={styles.headerImg} source={require('../images/orderDir.png')}></Image>
          </TouchableOpacity>
          <Text style={styles.headerText}>文章</Text>
          <TouchableOpacity style={this.state.isLogin ? styles.headerShare : styles.hidden} onPress={() => this.setState({isShare: true})}>
            <Image style={styles.shareImg} source={require('../images/share.png')}></Image>
          </TouchableOpacity>
        </View> 
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
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.isShare}>
          <View style={{ backgroundColor: "rgba(0,0,0,0.3)", height: "100%" }}>
            <View style={styles.modalWrap}>
              <View style={styles.titleContainer}>
                <Text allowFontScaling={false} style={styles.shareToTitle}>分享给好友</Text>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.shareBtn} onPress={() => this.share(1)}>
                  <Image style={styles.btnIcon} source={require('../images/toFriend.png')}/>
                  <Text>微信好友</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareBtn} onPress={() => this.share(2)}>
                  <Image style={styles.btnIcon} source={require('../images/toCircel.png')}/>
                  <Text>朋友圈</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.closeModel} onPress={() => this.setState({isShare: false})}>
                <Image style={styles.closeImg} source={require('../images/close.png')}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  },
  header:{
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#eeeeee',
    height: pxToDp(96),
    ...Platform.select({
      ios: {
        marginTop: pxToDp(28)
      },
      android: {}
    })
  },
  headerGoBack: {
    position: 'absolute',
    left: pxToDp(29),
    width: pxToDp(100),
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  headerShare: {
    position: 'absolute',
    right: pxToDp(40),
    width: pxToDp(50),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerImg:{
    width: pxToDp(24),
    height: pxToDp(40)
  },
  shareImg: {
    width: pxToDp(39),
    height: pxToDp(45)
  },
  headerText: {
    fontSize: pxToDp(36),
    color: '#020202'
  },
  modalWrap: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    paddingTop: pxToDp(40),
    paddingBottom: pxToDp(80),
    width: '100%',
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: pxToDp(80)
  },
  shareLine: {
    color: '#d0d0d0',
    textDecorationLine: 'line-through'
  },
  shareToTitle: {
    color: '#d0d0d0',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: pxToDp(68),
    marginRight: pxToDp(68),
  },
  shareBtn: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnIcon: {
    width: pxToDp(88),
    height: pxToDp(88),
    marginBottom: pxToDp(16)
  },
  closeModel: {
    position: 'absolute',
    right: pxToDp(30),
    top: pxToDp(50),
    width: pxToDp(50),
    height: pxToDp(50),
  },
  closeImg: {
    width: pxToDp(20),
    height: pxToDp(20)
  }
});
