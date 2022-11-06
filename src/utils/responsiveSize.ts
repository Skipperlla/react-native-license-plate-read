import {Dimensions, PixelRatio} from 'react-native';
let screenWidth = Dimensions.get('window').width;

function widthPercentageToDP(widthPercent: number) {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
}

export default function responsiveSize(size: number) {
  return widthPercentageToDP((size / 375) * 100);
}
