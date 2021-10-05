import React, {useContext, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SingleBook from '../components/Book/SingleBook';
import PublicHeader from '../components/shared/PublicHeader';
import {BookContext} from '../context/BookContext';

const DownloadedBookScreen = ({navigation}) => {
  const {
    bookState: {localBookListing},
    getLocalBook,
  } = useContext(BookContext);
  useEffect(() => {
    getLocalBook();
  }, []);
  return (
    <SafeAreaView>
      <PublicHeader navigation={navigation} />
      {localBookListing && localBookListing.length > 0 && (
        <View>
          <FlatList
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
            data={localBookListing}
            renderItem={({item}) => (
              <SingleBook navigation={navigation} item={item} type="small" />
            )}
            keyExtractor={item => item._id}
            numColumns={3}
          />
        </View>
      )}
    </SafeAreaView>
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

export default DownloadedBookScreen;
