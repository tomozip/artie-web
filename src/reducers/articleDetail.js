// constants
import articleDetailActionTypes from '../constants/articleDetailActionTypes';

const initialState = {
  article: {
    reviews: [],
  },
  cursor: '',
  isFetchedArticle: false,
  isFetchedReviews: false,
};

const articleDetail = (state = initialState, action) => {
  switch (action.type) {
    case articleDetailActionTypes.FETCH_ARTICLE:
      return Object.assign({}, state, {
        article: Object.assign({}, state.article, action.articleDetail.article),
        // isFetchedArticle: true,
        isFetchedArticle: true,
      });
    case articleDetailActionTypes.FETCH_INITIAL_ARTICLE_REVIEWS:
      return Object.assign({}, state, {
        article: Object.assign({}, state.article, {
          reviews: action.articleDetail.reviews,
        }),
        cursor: action.articleDetail.cursor,
        isFetchedReviews: action.articleDetail.isClient,
        // isFetchedArticleReviews: true,
        // isFetched: state.isFetchedArticle,
      });
    case articleDetailActionTypes.FETCH_NEXT_ARTICLE_REVIEWS:
      return Object.assign({}, state, {
        article: Object.assign({}, state.article, {
          reviews: [...state.article.reviews, ...action.articleDetail.reviews],
        }),
        cursor: action.articleDetail.cursor,
      });
    // case articleDetailActionTypes.FETCH_INITIAL_CURRENCY_DETAIL_POSTS:
    //   return Object.assign({}, state, {
    //     posts: action.articleDetail.posts,
    //     // page: action.articleDetail.page,
    //     isFetched: true,
    //   });
    // case articleDetailActionTypes.FETCH_NEXT_CURRENCY_DETAIL_POSTS:
    //   return Object.assign({}, state, {
    //     posts: [...state.posts, ...action.articleDetail.posts],
    //     // page: action.articleDetail.page,
    //   });
    default:
      return state;
  }
};

export default articleDetail;
