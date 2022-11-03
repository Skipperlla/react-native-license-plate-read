import React from 'react';
import {Pages} from '@utils/index';
import {createStackNavigator} from '@react-navigation/stack';
// * Screens
import {CameraPage, PlateInfo, RegisterPlate, SelectType} from '@screens/index';
import {RootStackParamList} from 'types/navigation';

const RootStack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const {CAMERA, PLATE_INFO, SELECT_TYPE, REGISTER_PLATE} = Pages;

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
      }}
      initialRouteName={SELECT_TYPE}>
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
