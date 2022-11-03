import React, {useState, useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  CameraDevice,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {OCRFrame, scanOCR} from 'vision-camera-ocr';
import {runOnJS} from 'react-native-reanimated';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from 'types/navigation';
import {CameraPageRight} from '@components/NavigationHeader';
import PlateTextRenderOverlay from '@components/PlateTextRenderOverlay';
type Props = StackScreenProps<RootStackParamList>;
export type FlashActiveProps = 'off' | 'on' | undefined;
export type CameraDeviceProps = CameraDevice | undefined;
const CameraPage = ({navigation}: Props): React.ReactElement => {
  // * Hooks
  const [isFlashActive, setIsFlashActive] = useState<FlashActiveProps>('off');
  const [ocr, setOcr] = useState<OCRFrame>();
  const devices = useCameraDevices();
  const device = devices.back;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <CameraPageRight
            isFlashActive={isFlashActive}
            setIsFlashActive={setIsFlashActive}
          />
        );
      },
    });
  }, [navigation, isFlashActive]);
  // * Functions
  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const data = scanOCR(frame);
    runOnJS(setOcr)(data);
  }, []);

  return device ? (
    <>
      <Camera
        style={[
          StyleSheet.absoluteFill,
          {
            flex: 1,
          },
        ]}
        frameProcessor={frameProcessor}
        device={device}
        isActive={true}
        enableZoomGesture
        torch={isFlashActive}
        frameProcessorFps={5}
      />
      <PlateTextRenderOverlay ocr={ocr} />
    </>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Camera not available</Text>
    </View>
  );
};

export default CameraPage;
