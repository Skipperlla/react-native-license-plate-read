import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainNavigator} from './navigation';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer independent={true}>
        <SafeAreaProvider>
          <MainNavigator />
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
