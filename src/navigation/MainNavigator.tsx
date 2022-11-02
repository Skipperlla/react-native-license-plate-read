import React, {useEffect, useState} from 'react';
import {Pages} from '@utils/index';
import {createStackNavigator} from '@react-navigation/stack';
// * Screens
import {CameraPage, PermissionsPage, PlateInfo} from '@screens/index';
import {RootStackParamList} from 'types/navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Camera, CameraPermissionStatus} from 'react-native-vision-camera';
import {Text, View, TouchableOpacity} from 'react-native';
import {Size} from '@assets/styles';

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
      <RootStack.Screen
        name={CAMERA}
        component={CameraPage}
        options={{
          headerShown: true,
          headerTitleAlign: 'left',
          headerTitle: () => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    marginRight: Size.margin,
                  }}>
                  <Ionicons
                    name={'close'}
                    size={Size.iconSize}
                    color={'black'}
                  />
                </TouchableOpacity>
                <View>
                  <Text style={{fontWeight: 'bold'}}>Scan Car Plate</Text>
                </View>
              </View>
            );
          },
        }}
      />
      <RootStack.Screen name={PLATE_INFO} component={PlateInfo} />
    </RootStack.Navigator>
  );
};
export default MainNavigator;
1;
