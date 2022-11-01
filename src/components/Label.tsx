import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import Animated, {useAnimatedProps} from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(TextInput);
Animated.addWhitelistedNativeProps({text: true});

const Label = ({sharedValue}: {sharedValue: Animated.SharedValue<string>}) => {
  const textProps = useAnimatedProps(
    () => ({text: sharedValue.value}),
    [sharedValue.value],
  );

  return (
    <AnimatedText
      style={styles.text}
      //@ts-expect-error native `text` prop isn't exposed in `TextInputProps`
      animatedProps={textProps}
      editable={false}
      multiline={true}
    />
  );
};
export default Label;
const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    top: 48,
    padding: 4,
    marginHorizontal: 20,
    backgroundColor: '#000000CC',
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
  },
});
