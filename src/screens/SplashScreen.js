import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';

const SplashScreen = ({navigation, route}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true, // <-- Add this
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
  }, []);
  return (
    <Animated.View // Special animatable View
      style={{
        ...styles.splashWrapper,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      <Text style={styles.splashText}>G-BOOK</Text>
    </Animated.View>
  );
};

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  splashWrapper: {
    flex: 1,
    width: ScreenWidth,
    height: ScreenHeight,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  splashText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },
});

export default SplashScreen;
