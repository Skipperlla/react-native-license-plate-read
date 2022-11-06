import React, {useState, useLayoutEffect, useCallback, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Pages from '@utils/pages';
import {plateRegex} from '@utils/index';
import {RootStackParamList} from 'types/navigation';
import {CameraPageRight} from '@components/NavigationHeader';

import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {OCRFrame, scanOCR} from 'vision-camera-ocr';
import {runOnJS} from 'react-native-reanimated';
import {StackScreenProps} from '@react-navigation/stack';

// * Types
type Props = StackScreenProps<RootStackParamList, Pages.CAMERA>;
export type FlashActiveProps = 'off' | 'on' | undefined;

const CameraPage = ({navigation}: Props) => {
  // * State's
  const [isFlashActive, setIsFlashActive] = useState<FlashActiveProps>('off');
  const [ocr, setOcr] = useState<OCRFrame>();

  // * Vision Camera Hooks
  const devices = useCameraDevices();
  const device = devices.back;

  // * Functions
  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const data = scanOCR(frame);
    runOnJS(setOcr)(data);
  }, []);
  const navigate = useCallback(
    (plate: string) => {
      navigation.navigate(Pages.PLATE_INFO, {
        plate,
      });
    },
    [navigation],
  );

  // * Effects
  useEffect(() => {
    ocr?.result?.blocks?.map(block => {
      if (block.text.match(plateRegex)) {
        navigate(block.text);
      }
    });
  }, [navigate, ocr]);
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

  return (
    <View style={styles.wrapper}>
      {device ? (
        <Camera
          style={{...StyleSheet.absoluteFillObject}}
          frameProcessor={frameProcessor}
          device={device}
          isActive={true}
          enableZoomGesture
          torch={isFlashActive}
          frameProcessorFps={5}
        />
      ) : (
        <View style={styles.notAvailableContainer}>
          <Text>Camera not available</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  notAvailableContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CameraPage;
