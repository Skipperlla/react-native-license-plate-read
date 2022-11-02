import colors from '@assets/styles/colors';
import {StyleSheet} from 'react-native';
import Size from './size';
const Bold = 'Poppins-Bold';
const Regular = 'Poppins-Regular';
const {heading, letterSpacing, bodyText, captionText} = Size;
export default StyleSheet.create({
  h1: {
    fontFamily: Bold,
    fontSize: heading.h1,
    letterSpacing,
  },
  h2: {fontFamily: Bold, fontSize: heading.h2, letterSpacing},
  h3: {fontFamily: Bold, fontSize: heading.h3, letterSpacing},
  h4: {fontFamily: Bold, fontSize: heading.h4, letterSpacing},
  h5: {fontFamily: Bold, fontSize: heading.h5, letterSpacing},
  h6: {fontFamily: Bold, fontSize: heading.h6, letterSpacing},

  // Body Text

  // Large
  bodyLargeBold: {
    fontFamily: Bold,
    fontSize: bodyText.Large,
    letterSpacing,
  },
  bodyLargeRegular: {
    fontFamily: Regular,
    fontSize: bodyText.Large,
    letterSpacing,
  },
  // Medium
  bodyMediumBold: {
    fontFamily: Bold,
    fontSize: bodyText.Medium,
    letterSpacing,
  },
  bodyMediumRegular: {
    fontFamily: Regular,
    fontSize: bodyText.Medium,
    letterSpacing,
  },
  // * Normal
  bodyNormalBold: {
    fontFamily: Bold,
    fontSize: bodyText.Normal,
    letterSpacing,
  },
  bodyNormalRegular: {
    fontFamily: Regular,
    fontSize: bodyText.Normal,
    letterSpacing,
  },

  // Caption Text

  // Large
  captionLargeBold: {
    fontFamily: Bold,
    fontSize: captionText.Large,
    letterSpacing,
  },
  captionLargeRegular: {
    fontFamily: Regular,
    fontSize: captionText.Large,
    letterSpacing,
  },
  // Medium
  captionMediumBold: {
    fontFamily: Bold,
    fontSize: captionText.Medium,
    letterSpacing,
  },
  captionMediumRegular: {
    fontFamily: Regular,
    fontSize: captionText.Medium,
    letterSpacing,
  },

  // Link Text

  // Large
  linkText: {
    fontFamily: Bold,
    fontSize: captionText.Large,
    letterSpacing,
    // color: colors.Primary.blue,
  },
});
