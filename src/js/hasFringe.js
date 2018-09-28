import {Dimensions} from 'react-native';
const deviceHeightDp = Dimensions.get('window').height;
const deviceWidthDp = Dimensions.get('window').width;

export default function hasFringe() {
    if (deviceHeightDp / deviceWidthDp > 2) {
        return true
    } else {
        return false
    }
}