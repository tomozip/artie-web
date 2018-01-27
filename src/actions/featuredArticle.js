import featuredArticleActionTypes from '../constants/featuredArticleActionTypes';

export const fetchInitialFeaturedArticles = (featuredArticle) => {
  return {
    type: featuredArticleActionTypes.FETCH_INITIAL_FEATURED_ARTICLES,
    featuredArticle,
  };
};

export const fetchNextFeaturedArticles = (featuredArticle) => {
  return {
    type: featuredArticleActionTypes.FETCH_NEXT_FEATURED_ARTICLES,
    featuredArticle,
  };
};
