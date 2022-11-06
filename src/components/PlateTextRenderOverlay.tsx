import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {OCRFrame} from 'vision-camera-ocr';
import {plateRegex} from '@utils/index';
// ! This file is currently unavailable
const PlateTextRenderOverlay = ({ocr}: {ocr?: OCRFrame}) => {
  return (
    <>
      {ocr?.result?.blocks?.map((block, index) => {
        return (
          <View key={index}>
            {block.text.match(plateRegex) && (
              <View style={styles.textContainer}>
                <Text style={styles.text}>{block.text}</Text>
              </View>
            )}
          </View>
        );
      })}
    </>
  );
};
const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    left: 200,
    top: 200,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 6,
  },
  text: {
    fontSize: 25,
    justifyContent: 'center',
    textAlign: 'center',
  },
});
export default PlateTextRenderOverlay;
