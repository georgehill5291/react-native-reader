import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import SingleBook from '../components/Book/SingleBook';
import {BookContext} from '../context/BookContext';
import theme from './../assets/theme';

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
    <View style={theme.flex1}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={setUpdateSearch}
        value={updateSearch}
        lightTheme={true}
        // onSubmitEditing={onSubmitEditing}
        // onCancel={onSubmitEditing}
      />
      {bookListing && bookListing.length > 0 && (
        <FlatList
          contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start'}}
          data={bookListing}
          renderItem={({item}) => (
            <SingleBook navigation={navigation} item={item} type="small" />
          )}
          keyExtractor={item => item._id}
          numColumns={3}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchViewWrapper: {
    paddingTop: 30,
    flex: 1,
  },
});

export default SearchBookScreen;
