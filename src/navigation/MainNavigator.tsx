import React, {useEffect, useState} from 'react';
import {Pages} from '@utils/index';
import {CameraPage, PlateInfo, SelectType} from '@screens/index';
import {RootStackParamList} from 'types/navigation';
import {createStackNavigator} from '@react-navigation/stack';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';

const RootStack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  // * State's
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();

  // * Effect's
  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);
  // * Permission's check
  if (cameraPermission == null) {
    return null;
  }
  const showPermissionsPage = cameraPermission !== 'authorized';

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName={showPermissionsPage ? Pages.SELECT_TYPE : Pages.CAMERA}>
      <RootStack.Screen
        name={Pages.CAMERA}
        component={CameraPage}
        options={{
          headerBackTitleVisible: false,
          headerTitle: 'Scan Car Plate',
        }}
      />
      <RootStack.Screen
        name={Pages.PLATE_INFO}
        component={PlateInfo}
        options={{
          headerBackTitleVisible: false,
          headerTitle: '',
        }}
      />
      <RootStack.Screen
        name={Pages.SELECT_TYPE}
        component={SelectType}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};
export default MainNavigator;
1;
