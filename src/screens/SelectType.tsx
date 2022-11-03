import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Colors, Size} from '@assets/styles';
import Pages from '@utils/pages';
import {RootStackParamList} from 'types/navigation';
import {StackScreenProps} from '@react-navigation/stack';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
type Props = StackScreenProps<RootStackParamList, Pages.SELECT_TYPE>;

const SelectType = ({navigation}: Props) => {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') await Linking.openSettings();
    setCameraPermissionStatus(permission);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        onPress={() => {
          if (cameraPermissionStatus === 'authorized')
            navigation.navigate(Pages.CAMERA);
          else requestCameraPermission();
        }}
        style={{...style.button, marginRight: Size.margin}}>
        <Text>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.button}
        onPress={() => {
          Alert.alert('Coming soon');
          // navigation.navigate(Pages.MEDIA);
        }}>
        <Text>Media</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  button: {
    backgroundColor: Colors.Primary.button,
    paddingHorizontal: Size.padding,
    paddingVertical: Size.padding / 2,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectType;
