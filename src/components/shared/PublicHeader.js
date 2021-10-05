import React from 'react';
import {Header} from 'react-native-elements';

const PublicHeader = ({navigation}) => {
  const onPressSearch = () => {
    navigation.navigate('SearchBookScreen');
  };

  return (
    <Header
      placement="left"
      centerComponent={{text: 'G-Book', style: {color: '#fff'}}}
      rightComponent={{icon: 'search', color: '#fff', onPress: onPressSearch}}
    />
  );
};

export default PublicHeader;
