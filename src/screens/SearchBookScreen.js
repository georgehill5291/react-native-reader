import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';
import SingleBook from '../components/Book/SingleBook';
import {BookContext} from '../context/BookContext';

const SearchBookScreen = ({navigation}) => {
  const [updateSearch, setUpdateSearch] = useState('');

  const {
    bookState: {
      bookListing,
      bookListing4Home,
      bookListingLoading,
      totalPages,
      currentPage,
      total,
    },
    getBook,
  } = useContext(BookContext);

  useEffect(() => {
    //Storage.removeItem('downloadedBooks');
    getBook(updateSearch, 0, 20);
  }, []);

  useEffect(() => {
    //Storage.removeItem('downloadedBooks');
    getBook(updateSearch, 0, 20);
  }, [updateSearch]);

  // const onSubmitEditing = () => {
  //   getBook(updateSearch, 0, 20);
  // };

  return (
    <View style={styles.searchViewWrapper}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={setUpdateSearch}
        value={updateSearch}
        lightTheme={true}
        // onSubmitEditing={onSubmitEditing}
        // onCancel={onSubmitEditing}
      />
      {bookListing && bookListing.length > 0 && (
        <View>
          <FlatList
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
            data={bookListing}
            renderItem={({item}) => (
              <SingleBook navigation={navigation} item={item} type="small" />
            )}
            keyExtractor={item => item._id}
            numColumns={3}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchViewWrapper: {
    paddingTop: 30,
  },
});

export default SearchBookScreen;
