import currencyDetailActionTypes from '../constants/currencyDetailActionTypes';

export const changeFocusedCurrency = currency => ({
  type: currencyDetailActionTypes.CHANGE_FOCUSED_CURRENCY,
  currency,
});

export const fetchCurrencies = currencies => ({
  type: currencyDetailActionTypes.FETCH_CURRENCIES,
  currencies,
});

export const fetchInitialCurrencyDetailPosts = currencyPosts => ({
  type: currencyDetailActionTypes.FETCH_INITIAL_CURRENCY_DETAIL_POSTS,
  currencyPosts,
});

export const fetchNextCurrencyDetailPosts = currencyPosts => ({
  type: currencyDetailActionTypes.FETCH_NEXT_CURRENCY_DETAIL_POSTS,
  currencyPosts,
});
