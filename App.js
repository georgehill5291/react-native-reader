/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import React, {useEffect} from 'react';
import {Animated, Text} from 'react-native';
import BookContextProvider from './src/context/BookContext';
import BookDetailScreen from './src/screens/BookDetailScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchBookScreen from './src/screens/SearchBookScreen';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <BookContextProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen
              name="BookDetail"
              component={BookDetailScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SearchBookScreen"
              component={SearchBookScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </BookContextProvider>
  );
};

export default App;

const ProfileScreen = ({navigation, route}) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};
