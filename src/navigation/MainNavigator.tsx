import React, {useEffect, useState} from 'react';
import {Pages} from '@utils/index';
import {createStackNavigator} from '@react-navigation/stack';
// * Screens
import {
  CameraPage,
  PermissionsPage,
  PlateInfo,
  RegisterPlate,
  SelectType,
} from '@screens/index';
import {RootStackParamList} from 'types/navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
import {Text, View, TouchableOpacity} from 'react-native';
import {Size} from '@assets/styles';

const RootStack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const {CAMERA, PERMISSIONS, PLATE_INFO, SELECT_TYPE, REGISTER_PLATE} = Pages;
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
      initialRouteName={PLATE_INFO}>
      {/* showPermissionsPage ? PERMISSIONS : CAMERA */}
      <RootStack.Screen name={PERMISSIONS} component={PermissionsPage} />
      <RootStack.Screen
        name={CAMERA}
        component={CameraPage}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: 'Scan Car Plate',
        }}
      />
      <RootStack.Screen name={PLATE_INFO} component={PlateInfo} />
      <RootStack.Screen name={SELECT_TYPE} component={SelectType} />
      <RootStack.Screen name={REGISTER_PLATE} component={RegisterPlate} />
    </RootStack.Navigator>
  );
};
export default MainNavigator;
1;
