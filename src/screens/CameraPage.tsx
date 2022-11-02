import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Text,
  SafeAreaView,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {OCRFrame, scanOCR} from 'vision-camera-ocr';
import {runOnJS} from 'react-native-reanimated';
import Pages from '@utils/pages';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from 'types/navigation';
type Props = StackScreenProps<RootStackParamList, Pages.PERMISSIONS>;

const CameraPage = ({navigation}: Props): React.ReactElement => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isCameraActive, setIsCameraActive] = React.useState(true);
  const [ocr, setOcr] = React.useState<OCRFrame>();
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
  const RenderOverlay = () => {
    return (
      <>
        {ocr?.result.blocks.map((block, index) => {
          const regex =
            /^(0[1-9]|[1-7][0-9]|8[01])((\s?[a-zA-Z]\s?)(\d{4,5})|(\s?[a-zA-Z]{2}\s?)(\d{3,4})|(\s?[a-zA-Z]{3}\s?)(\d{2,3}))$/gm;
          useEffect(() => {
            if (block.text.match(regex)) {
              setIsCameraActive(false);
              navigation.navigate(Pages.PLATE_INFO);
            }
          }, []);
          return (
            <View key={index}>
              {block.text.match(regex) ? (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(`"${block.text}" copied to the clipboard`);
                  }}
                  style={{
                    position: 'absolute',
                    left: 200,
                    top: 200,
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
  // console.log('hasPermission', hasPermission);
  // console.log('device', device);
  return false && device !== undefined && hasPermission ? (
    <>
      <Camera
        style={[StyleSheet.absoluteFill]}
        frameProcessor={frameProcessor}
        device={device}
        isActive={isCameraActive}
        enableZoomGesture
        enablePinchToZoom
        enableTapToFocus
        enableExposureGesture
        enableAutoFocus
        enableAutoExposure
        enableAutoWhiteBalance
        enableAutoFrameRate
        enableAutoHDR
        enableAutoVideoStabilization
        enableAutoDepthDataDelivery
        enableAutoPortraitEffectsMatteDelivery
        enableAutoSemanticSegmentationMatteDelivery
        enableAutoLowLightBoost
        enableAutoOpticalImageStabilization
        enableAutoPhotoQualityPrioritization
        enableAutoDualCameraFusion
        enableAutoRedEyeReduction
        enableAutoFaceDetection
        enableAutoFaceTracking
        enableAutoBodyDetection
        hasF
        frameProcessorFps={5}
      />
      {<RenderOverlay />}
    </>
  ) : (
    <SafeAreaView
      style={{
        flexDirection: '',
      }}>
      <Text>No Camera</Text>
    </SafeAreaView>
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
