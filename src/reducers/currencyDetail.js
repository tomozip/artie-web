import currencyDetailActionTypes from '../constants/currencyDetailActionTypes';

const initialState = {
  focusedCurrncy: {},
  currencies: [],
  posts: [],
  cursor: '',
  isFetched: false,
};

const currencyDetail = (state = initialState, action) => {
  switch (action.type) {
    case currencyDetailActionTypes.CHANGE_FOCUSED_CURRENCY:
      return Object.assign({}, state, {
        currency: action.currencyDetail.currency,
      });
    case currencyDetailActionTypes.FETCH_CURRENCIES:
      return Object.assign({}, state, {
        currencies: action.currencyDetail.currencies,
      });
    case currencyDetailActionTypes.FETCH_INITIAL_CURRENCY_DETAIL_POSTS:
      return Object.assign({}, state, {
        posts: action.currencyDetail.posts,
        // page: action.currencyDetail.page,
        isFetched: true,
      });
    case currencyDetailActionTypes.FETCH_NEXT_CURRENCY_DETAIL_POSTS:
      return Object.assign({}, state, {
        posts: [...state.posts, ...action.currencyDetail.posts],
        // page: action.currencyDetail.page,
      });
    default:
      return state;
  }
};

export default currencyDetail;
