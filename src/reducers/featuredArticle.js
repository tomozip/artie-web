import featuredArticleActionTypes from '../constants/featuredArticleActionTypes';

const initialState = {
  articles: [],
  // page: 1,
  isFetched: false,
};

const featuredArticle = (state = initialState, action) => {
  switch (action.type) {
    case featuredArticleActionTypes.FETCH_INITIAL_FEATURED_ARTICLES:
      return Object.assign({}, state, {
        articles: action.featuredArticle.articles,
        // page: action.featuredArticle.page,
        isFetched: true,
      });
    case featuredArticleActionTypes.FETCH_NEXT_FEATURED_ARTICLES:
      return Object.assign({}, state, {
        articles: [...state.articles, ...action.featuredArticle.articles],
        // page: action.featuredArticle.page,
      });
    default:
      return state;
  }
};

export default featuredArticle;
