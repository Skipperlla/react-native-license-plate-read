import React, {useEffect, useState} from 'react';
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
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {Size} from '@assets/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
type Props = StackScreenProps<RootStackParamList, Pages.CAMERA>;

const CameraPage = ({navigation}: Props): React.ReactElement => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isFlashActive, setIsFlashActive] = useState<string>('off');

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
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{paddingRight: Size.padding, flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                if (isFlashActive === 'on') setIsFlashActive('off');
                else setIsFlashActive('on');
              }}
              style={{
                marginRight: Size.margin,
              }}>
              <Ionicons
                name={isFlashActive === 'on' ? 'flash' : 'flash-off'}
                size={Size.iconSize}
                color={'black'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <AntDesign
                name={'questioncircle'}
                size={Size.iconSize}
                color={'black'}
              />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation, isFlashActive]);

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
  return device !== undefined && hasPermission ? (
    <>
      <Camera
        style={[StyleSheet.absoluteFill]}
        frameProcessor={frameProcessor}
        device={device}
        isActive={true}
        enableZoomGesture
        torch={isFlashActive}
        frameProcessorFps={5}
      />
      {<RenderOverlay />}
    </>
  ) : (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',

          backgroundColor: 'black',
        }}>
        <View
          style={{
            flex: 1,
            width: '100%',

            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
          }}>
          <Text>No Camera</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue',
            marginBottom: getBottomSpace(),
            width: '100%',
          }}>
          <Text>No Camera</Text>
        </View>
      </View>
    </>
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
