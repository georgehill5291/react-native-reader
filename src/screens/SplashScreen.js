import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';

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
    PushNotification.channelExists('channel-id', function (exist) {
      console.log('isExistChannel', exist);

      if (!exist) {
        PushNotification.createChannel(
          {
            channelId: 'channel-id', // (required)
            channelName: 'My channel', // (required)
            channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
            playSound: false, // (optional) default: true
            soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
          },
          created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
        );
      }
    });

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
