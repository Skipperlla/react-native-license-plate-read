import React from 'react';
import {Pages} from '@utils/index';
import {createStackNavigator} from '@react-navigation/stack';
// * Screens
import {CameraPage} from '@screens/index';
import {RootStackParamList} from 'types/navigation';

const RootStack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const {CAMERA} = Pages;

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
      }}
      initialRouteName={CAMERA}>
      {/* <RootStack.Screen name={PERMISSIONS} component={Permissions} /> */}
      <RootStack.Screen name={CAMERA} component={CameraPage} />
    </RootStack.Navigator>
  );
};
export default MainNavigator;
1;
