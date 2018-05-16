import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    AsyncStorage,
    Alert,
    DeviceEventEmitter
} from 'react-native';
//视屏的宽度和设置像素转换
const deviceWidthDp = Dimensions.get('window').width;

const uiWidthPx = 750;

function pxToDp(uiElementPx) {
  return uiElementPx *  deviceWidthDp / uiWidthPx;
}
module.exports = pxToDp