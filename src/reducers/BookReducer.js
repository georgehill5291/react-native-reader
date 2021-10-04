import {
  BOOK_LOADED_SUCCESS,
  FIND_BOOK_BY_ID,
  LOCAL_BOOK_LOADED_SUCCESS,
  BOOK_4_HOME_LOADED_SUCCESS,
} from '../helper/ConstUtil';

export const bookReducer = (state, action) => {
  console.log('action', action);
  switch (action.type) {
    case BOOK_4_HOME_LOADED_SUCCESS:
      return {
        ...state,
        bookListing4Home: action.payload.bookListing4Home,
      };
    case BOOK_LOADED_SUCCESS:
      return {
        ...state,
        bookListing: action.payload.bookListing,
        bookListingLoading: false,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        total: action.payload.total,
      };
    case LOCAL_BOOK_LOADED_SUCCESS:
      return {
        ...state,
        localBookListing: action.payload.localBookListing,
      };
    case FIND_BOOK_BY_ID:
      const bookDetail = action.payload;
      // console.log('redux', bookDetail);
      return {
        ...state,
        bookDetail: bookDetail,
      };
    default:
      return state;
  }
  return state;
};
