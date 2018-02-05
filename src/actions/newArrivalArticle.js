import newArrivalArticleActionTypes from '../constants/newArrivalArticleActionTypes';

export const fetchInitialNewArrivalArticles = (newArrivalArticle) => {
  return {
    type: newArrivalArticleActionTypes.FETCH_INITIAL_NEW_ARRIVAL_ARTICLES,
    newArrivalArticle,
  };
};

export const fetchNextNewArrivalArticles = (newArrivalArticle) => {
  return {
    type: newArrivalArticleActionTypes.FETCH_NEXT_NEW_ARRIVAL_ARTICLES,
    newArrivalArticle,
  };
};
