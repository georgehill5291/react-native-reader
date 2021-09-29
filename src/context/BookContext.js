import axios from 'axios';
import React, {createContext, useReducer} from 'react';
import {bookReducer} from '../reducers/BookReducer';
import {
  BOOK_LOADED_SUCCESS,
  FIND_BOOK_BY_ID,
  LOCAL_BOOK_LOADED_SUCCESS,
  apiUrl,
} from '../helper/ConstUtil';
import Storage from '../helper/Storage';

const defaultData = {
  bookDetail: null,
  localBookListing: [],
  bookListing: [],
  bookListingLoading: false,
  totalPages: 0,
  currentPage: 0,
  total: 0,
};

export const BookContext = createContext({
  bookState: defaultData,
  getBook: () => {},
  findBookById: () => {},
  getLocalBook: () => {},
});

const BookContextProvider = ({children}) => {
  //reducer
  const [bookState, dispatch] = useReducer(bookReducer, defaultData);

  //get News
  const getBook = async () => {
    try {
      const response = await axios.get(`${apiUrl}/books`);

      //alert(response);

      if (response.data.success) {
        dispatch({
          type: BOOK_LOADED_SUCCESS,
          payload: {
            bookListing: response.data.books.docs,
            totalPages: response.data.books.totalPages,
            currentPage: response.data.books.page,
            total: response.data.books.totalDocs,
          },
        });
      }
    } catch (error) {
      // ADD THIS THROW error
      alert(error.message);
    }
  };

  //get News
  const getLocalBook = async () => {
    try {
      let localBooks = await Storage.getItem('downloadedBooks');

      //alert(response);

      if (localBooks) {
        dispatch({
          type: LOCAL_BOOK_LOADED_SUCCESS,
          payload: {
            localBookListing: localBooks,
          },
        });
      }
    } catch (error) {
      // ADD THIS THROW error
      alert(error.message);
    }
  };

  //get item by id
  const findBookById = async bookId => {
    try {
      const response = await axios.get(`${apiUrl}/books/${bookId}`);

      // alert(response.data.success);

      dispatch({
        type: FIND_BOOK_BY_ID,
        payload: response.data.book,
      });

      // if (response.data.success) {
      //   dispatch({
      //     type: FIND_BOOK_BY_ID,
      //     payload: response.data.book,
      //   });
      // }
    } catch (error) {
      // ADD THIS THROW error
      alert(error.message);
    }
  };

  const bookContextData = {
    bookState: bookState,
    getBook: getBook,
    findBookById,
    getLocalBook,
  };

  return (
    <BookContext.Provider value={bookContextData}>
      {children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
