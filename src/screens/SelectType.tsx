import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Pages, rs} from '@utils/index';
import {RootStackParamList} from 'types/navigation';
import {StackScreenProps} from '@react-navigation/stack';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
type Props = StackScreenProps<RootStackParamList, Pages.SELECT_TYPE>;

const SelectType = ({navigation}: Props) => {
  // * State's
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');
  // * Functions
  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setCameraPermissionStatus(permission);
  }, []);
  // * Effects
  useEffect(() => {
    if (cameraPermissionStatus === 'authorized') {
      navigation.replace(Pages.CAMERA);
    }
  }, [cameraPermissionStatus, navigation]);
  return (
    <SafeAreaView style={style.wrapper}>
      <TouchableOpacity
        onPress={requestCameraPermission}
        style={{...style.button, marginRight: rs(16)}}>
        <Text>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.button}
        onPress={() => {
          Alert.alert('Coming soon');
        }}>
        <Text>Media</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#00adb5',
    paddingHorizontal: rs(16),
    paddingVertical: rs(16) / 2,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectType;
