import {Dimensions, PixelRatio} from 'react-native';
let screenWidth = Dimensions.get('window').width;

// https://www.npmjs.com/package/react-native-responsive-screen
function widthPercentageToDP(widthPercent: number) {
  // Parse string percentage input and convert it to number.
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
}

/**
 * @param size size given in the design
 * @returns responsive size of the text
 */
export default function responsiveSize(size: number) {
  return widthPercentageToDP((size / 375) * 100);
}
