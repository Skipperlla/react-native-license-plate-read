import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  PixelRatio,
  TouchableOpacity,
  Alert,
  Text,
  LayoutChangeEvent,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {labelImage} from 'vision-camera-image-labeler';
import {OCRFrame, scanOCR} from 'vision-camera-ocr';
import {runOnJS} from 'react-native-reanimated';

import {Label} from '@components/index';
const CameraPage = () => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [ocr, setOcr] = React.useState<OCRFrame>();
  const [pixelRatio, setPixelRatio] = React.useState<number>(1);
  const devices = useCameraDevices();
  const device = devices.back;

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const data = scanOCR(frame);
    runOnJS(setOcr)(data);
  }, []);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);
  const renderOverlay = () => {
    return (
      <>
        {ocr?.result.blocks.map((block, index) => {
          const regex =
            /^(0[1-9]|[1-7][0-9]|8[01])((\s?[a-zA-Z]\s?)(\d{4,5})|(\s?[a-zA-Z]{2}\s?)(\d{3,4})|(\s?[a-zA-Z]{3}\s?)(\d{2,3}))$/gm;
          return (
            <View key={index}>
              {block.text.match(regex) ? (
                <TouchableOpacity
                  onPress={() => {
                    // Clipboard.setString(block.text);
                    Alert.alert(`"${block.text}" copied to the clipboard`);
                  }}
                  style={{
                    position: 'absolute',
                    // left: block.frame.x * pixelRatio,
                    // top: block.frame.y * pixelRatio,
                    backgroundColor: 'white',
                    padding: 8,
                    borderRadius: 6,
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}>
                    {block.text}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          );
        })}
      </>
    );
  };
  return device !== undefined && hasPermission ? (
    <>
      <Camera
        style={[StyleSheet.absoluteFill]}
        frameProcessor={frameProcessor}
        device={device}
        isActive={true}
        frameProcessorFps={5}
        onLayout={(event: LayoutChangeEvent) => {
          setPixelRatio(
            event.nativeEvent.layout.width /
              PixelRatio.getPixelSizeForLayoutSize(
                event.nativeEvent.layout.width,
              ),
          );
        }}
      />
      {renderOverlay()}
    </>
  ) : (
    <View>
      <Text>No available cameras</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
});
export default CameraPage;