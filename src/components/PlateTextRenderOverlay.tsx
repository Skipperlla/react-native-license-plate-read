import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {OCRFrame} from 'vision-camera-ocr';
import Pages from '@utils/pages';
import {useEffect} from 'react';
import {useAppNavigation} from '@utils/hooks';
import {useCallback} from 'react';

const PlateTextRenderOverlay = ({ocr}: {ocr?: OCRFrame}) => {
  const navigation = useAppNavigation();
  const navigate = useCallback((plate: string) => {
    navigation.navigate(Pages.PLATE_INFO, {
      plate,
    });
  }, []);
  return (
    <>
      {ocr?.result.blocks.map((block, index) => {
        const regex =
          /^(0[1-9]|[1-7][0-9]|8[01])((\s?[a-zA-Z]\s?)(\d{4,5})|(\s?[a-zA-Z]{2}\s?)(\d{3,4})|(\s?[a-zA-Z]{3}\s?)(\d{2,3}))$/gm;
        useEffect(() => {
          if (block.text.match(regex)) {
            navigate(block.text);
          }
        }, []);
        return (
          <View key={index}>
            {block.text.match(regex) && (
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
