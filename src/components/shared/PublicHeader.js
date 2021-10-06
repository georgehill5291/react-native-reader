import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {flex} from 'styled-system';
import theme from './../../assets/theme';
import {Icon} from 'react-native-elements';

const PublicHeader = ({navigation}) => {
  const onPressSearch = () => {
    navigation.navigate('SearchBookScreen');
  };

  return (
    // <Header
    //   placement="left"
    //   centerComponent={{text: 'G-Book', style: {color: '#fff'}}}
    //   rightComponent={{icon: 'search', color: '#fff', onPress: onPressSearch}}
    // />
    <View
      style={{
        height: 50,
        flexDirection: 'row',
        backgroundColor: theme.colors.steelblue,
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingLeft: theme.spacing.m,
        }}>
        <Text style={{color: theme.colors.white, fontWeight: 'bold'}}>
          G-Book
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingRight: theme.spacing.m,
        }}>
        <TouchableOpacity onPress={onPressSearch}>
          <Icon name="search" color={theme.colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PublicHeader;
