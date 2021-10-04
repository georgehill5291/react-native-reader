import React, {useContext, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import DeletePopup from '../shared/DeletePopup';
import Storage from '../../helper/Storage';
import {BookContext} from '../../context/BookContext';

const SingleBook = ({navigation, item, type}) => {
  const [removeBookModal, setRemoveBookModal] = useState(false);
  const [removeBookItem, setRemoveBookItem] = useState(null);
  const {getLocalBook} = useContext(BookContext);

  const onPressBook = book => {
    console.log(book);
    navigation.navigate('BookDetail', {bookId: book._id});
  };

  const onLongPressBook = async book => {
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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPressBook.bind(this, item)}
        onLongPress={onLongPressBook.bind(this, item)}>
        <View
          style={
            type === 'small' ? styles.card_template_small : styles.card_template
          }>
          <Image
            key={new Date()}
            style={
              type === 'small' ? styles.card_image_small : styles.card_image
            }
            source={{
              uri: item.imageFile.imageUrl,
            }}
          />
          <View
            style={
              type === 'small'
                ? styles.text_container_small
                : styles.text_container
            }>
            <Text style={styles.card_title}>{item.title['en']}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <DeletePopup {...removeBookProps} />
    </View>
  );
};

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    padding: 7,
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
  text_container_small: {
    position: 'absolute',
    width: width * 0.3,
    height: 30,
    bottom: 0,
    padding: 5,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.3)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  card_template_small: {
    flex: 0.3,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    elevation: 5,
  },
  card_image_small: {
    flex: 75,
    width: width * 0.3,
    height: 170,
    borderRadius: 10,
  },
});

export default SingleBook;
