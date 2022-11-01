import React from 'react';
import {Pages} from '@utils/index';
import {createStackNavigator} from '@react-navigation/stack';

// * Screens
import {Home} from '@screens/index';
import {RootStackParamList} from 'types/navigation';

const RootStack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const {HOME} = Pages;
  return (
    <RootStack.Navigator initialRouteName={HOME}>
      <RootStack.Group
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}>
        <RootStack.Screen name={HOME} component={Home} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
export default MainNavigator;
1;
