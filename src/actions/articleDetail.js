import articleDetailActionTypes from '../constants/articleDetailActionTypes';

export const fetchArticle = articleDetail => ({
  type: articleDetailActionTypes.FETCH_ARTICLE,
  articleDetail,
});

export const fetchInitialArticleReviews = articleDetail => ({
  type: articleDetailActionTypes.FETCH_INITIAL_ARTICLE_REVIEWS,
  articleDetail,
});

export const fetchNextArticleReviews = articleDetail => ({
  type: articleDetailActionTypes.FETCH_NEXT_ARTICLE_REVIEWS,
  articleDetail,
});
