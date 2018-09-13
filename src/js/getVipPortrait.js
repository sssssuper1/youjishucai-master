export default function getVipPortrait(level) {
  let potrait;
  switch (level) {
    case 0:
      potrait = require('../images/vip0.png');
      break;
    case 1:
      potrait = require('../images/vip1.png');
      break;
    case 2:
      potrait = require('../images/vip2.png');
      break;
    case 3:
      potrait = require('../images/vip3.png');
      break;
    case 4:
      potrait = require('../images/vip4.png');
      break;
    case 5:
      potrait = require('../images/vip5.png');
      break;
    default:
      potrait = require('../images/vip0.png');
      break;
  }
  return potrait;
}