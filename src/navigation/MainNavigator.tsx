import React, {useEffect, useState} from 'react';
import {Pages} from '@utils/index';
import {createStackNavigator} from '@react-navigation/stack';
// * Screens
import {CameraPage, PermissionsPage, PlateInfo} from '@screens/index';
import {RootStackParamList} from 'types/navigation';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';

const RootStack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const {CAMERA, PERMISSIONS, PLATE_INFO} = Pages;
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  console.log(`Re-rendering Navigator. Camera: ${cameraPermission}`);

  if (cameraPermission == null) {
    // still loading
    return null;
  }

  const showPermissionsPage = cameraPermission !== 'authorized';
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
      }}
      initialRouteName={showPermissionsPage ? PERMISSIONS : CAMERA}>
      <RootStack.Screen name={PERMISSIONS} component={PermissionsPage} />
      <RootStack.Screen name={CAMERA} component={CameraPage} />
      <RootStack.Screen name={PLATE_INFO} component={PlateInfo} />
    </RootStack.Navigator>
  );
};
export default MainNavigator;
1;
