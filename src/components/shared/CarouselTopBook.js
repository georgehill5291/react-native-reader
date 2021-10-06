import React, {useContext, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  LogBox,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-banner-carousel';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 200;

const CarouselTopBook = ({navigation, bookListing}) => {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    LogBox.ignoreLogs(['componentWillReceiveProps']);
  }, []);

  const onPressBook = book => {
    console.log(book);
    navigation.navigate('BookDetail', {bookId: book._id});
  };

  const renderPage = (item, index) => {
    return (
      <View key={index}>
        <TouchableOpacity onPress={onPressBook.bind(this, item)}>
          <Image
            style={{width: BannerWidth, height: BannerHeight}}
            source={{uri: item.imageFile.imageUrl}}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        autoplay
        autoplayTimeout={5000}
        loop
        index={0}
        pageSize={BannerWidth}>
        {bookListing.map((item, index) => renderPage(item, index))}
      </Carousel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default CarouselTopBook;
