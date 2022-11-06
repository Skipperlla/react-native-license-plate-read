import React from 'react';
import {StyleSheet} from 'react-native';
import {MainNavigator} from '@navigation/index';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <NavigationContainer>
        <SafeAreaProvider>
          <MainNavigator />
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  wrapper: {flex: 1},
});

export default App;
