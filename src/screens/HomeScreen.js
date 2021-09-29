import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {BookContext} from '../context/BookContext';
import ProgressCircle from 'react-native-progress-circle';
import Storage from '../helper/Storage';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const {
    bookState: {
      localBookListing,
      bookListing,
      bookListingLoading,
      totalPages,
      currentPage,
      total,
    },
    getBook,
    getLocalBook,
  } = useContext(BookContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    //Storage.removeItem('downloadedBooks');
    getBook();
    getLocalBook();
  }, []);

  useEffect(() => {
    getLocalBook();
  }, [useIsFocused]);

  onPressBook = book => {
    console.log(book);
    navigation.navigate('BookDetail', {bookId: book._id});
  };

  const renderItem = ({item}) => (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressBook.bind(this, item)}>
        <View style={styles.card_template}>
          <Image
            key={new Date()}
            style={styles.card_image}
            source={{
              uri: item.imageFile.imageUrl,
            }}
          />
          <View style={styles.text_container}>
            <Text style={styles.card_title}>{item.title['en']}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <View style={styles.categoryWrapper}>
        <Text style={styles.categoryText}>Downloaded Book --</Text>
      </View>
      {localBookListing && localBookListing.length > 0 && (
        <FlatList
          horizontal={true}
          data={localBookListing}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      )}

      <View style={styles.categoryWrapper}>
        <Text style={styles.categoryText}>Bookshelf --</Text>
      </View>

      <FlatList
        horizontal={true}
        data={bookListing}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryWrapper: {
    marginTop: 25,
    marginLeft: 30,
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  card_template: {
    width: 150,
    height: 250,
  },
  card_image: {
    width: 150,
    height: 250,
    borderRadius: 10,
  },
  text_container: {
    position: 'absolute',
    width: 150,
    height: 30,
    bottom: 0,
    padding: 5,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.3)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  card_title: {
    color: 'white',
  },
});

export default HomeScreen;
