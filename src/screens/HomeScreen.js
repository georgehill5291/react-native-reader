import React, {useContext, useEffect, useReducer, useState} from 'react';
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
  BackHandler,
} from 'react-native';
import {BookContext} from '../context/BookContext';
import ProgressCircle from 'react-native-progress-circle';
import Storage from '../helper/Storage';
import {useIsFocused} from '@react-navigation/native';
import DeletePopup from '../components/shared/DeletePopup';
import DownloadedBookScreen from './DownloadedBookScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {
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
    getBook4Home,
    getLocalBook,
  } = useContext(BookContext);

  const [removeBookModal, setRemoveBookModal] = useState(false);
  const [removeBookItem, setRemoveBookItem] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    //Storage.removeItem('downloadedBooks');
    getBook4Home();
    getLocalBook();
  }, []);

  useEffect(() => {
    getLocalBook();
  }, [isFocused]);

  const onPressBook = book => {
    console.log(book);
    navigation.navigate('BookDetail', {bookId: book._id});
  };

  const onLongPressBook = async book => {
    // alert('long press');
    // await removeFunction(book);
    // getLocalBook();
    if (book.localFile) {
      setRemoveBookModal(true);
      setRemoveBookItem(book);
    }
  };

  const removeFunction = async () => {
    let localBooks = await Storage.getItem('downloadedBooks');
    // console.log('localBook', localBooks);
    const currentLocalBooks = localBooks.filter(
      t => t._id !== removeBookItem._id,
    );
    await Storage.setItem('downloadedBooks', currentLocalBooks);
    setRemoveBookModal(false);
    getLocalBook();
  };

  const removeBookProps = {removeBookModal, setRemoveBookModal, removeFunction};

  const renderItem = ({item}) => (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPressBook.bind(this, item)}
        onLongPress={onLongPressBook.bind(this, item)}>
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

  const ListingView = () => (
    <ScrollView>
      {bookListing4Home &&
        bookListing4Home.length > 0 &&
        bookListing4Home.map(bookListingByType => (
          <View key={bookListingByType.type}>
            <View style={styles.categoryWrapper}>
              <Text style={styles.categoryText}>
                {bookListingByType.type} --
              </Text>
            </View>
            <FlatList
              horizontal={true}
              data={bookListingByType.books}
              renderItem={renderItem}
              keyExtractor={item => item._id}
            />
          </View>
        ))}
      <DeletePopup {...removeBookProps} />
    </ScrollView>
  );

  return (
    <Tab.Navigator
      initialRouteName="Books"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Downloaded Book"
        component={DownloadedBookScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="book" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Books"
        component={ListingView}
        options={{
          headerShown: false,
          tabBarLabel: 'Books',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="book-search-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
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
