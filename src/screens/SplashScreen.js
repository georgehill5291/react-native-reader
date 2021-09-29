import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const SplashScreen = ({navigation, route}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  }, []);
  return (
    <View style={styles.splashWrapper}>
      <Text style={styles.splashText}>Splash Screen</Text>
    </View>
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
  },
});

export default SplashScreen;
