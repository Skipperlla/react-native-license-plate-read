import {Dimensions} from 'react-native';
import {responsiveSize as rs} from '@utils/index';
const heading = {
  h1: rs(32),
  h2: rs(24),
  h3: rs(20),
  h4: rs(16),
  h5: rs(14),
  h6: rs(12),
};
const bodyText = {
  Large: rs(16),
  Medium: rs(14),
  Normal: rs(12),
};
const captionText = {
  Large: rs(12),
  Medium: rs(10),
};
const linkText = {
  Large: rs(12),
};
const letterSpacing = rs(0.5);
const iconSize = rs(18);
const padding = rs(16);
const margin = rs(16);
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default {
  windowWidth,
  iconSize,
  letterSpacing,
  windowHeight,
  heading,
  bodyText,
  captionText,
  padding,
  linkText,
  margin,
};
