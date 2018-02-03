// constants
import featuredArticleActionTypes from '../constants/featuredArticleActionTypes';

const initialState = {
  articles: [],
  cursor: Date(),
  hasNext: true,
  isFetched: false,
};

const featuredArticle = (state = initialState, action) => {
  switch (action.type) {
    case featuredArticleActionTypes.FETCH_INITIAL_FEATURED_ARTICLES:
      return Object.assign({}, state, {
        articles: action.featuredArticle.articles,
        cursor: action.featuredArticle.cursor,
        hasNext: action.featuredArticle.hasNext,
        isFetched: true,
      });
    case featuredArticleActionTypes.FETCH_NEXT_FEATURED_ARTICLES:
      return Object.assign({}, state, {
        articles: [...state.articles, ...action.featuredArticle.articles],
        cursor: action.featuredArticle.cursor,
        hasNext: action.featuredArticle.hasNext,
      });
    default:
      return state;
  }
};

export default featuredArticle;
