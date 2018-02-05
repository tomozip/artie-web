// entities
import Article from '../entities/Article';
import Review from '../entities/Review';

const isSuccess = (status) => {
  switch (status) {
    case 200:
      return true;
    case 400:
    case 401:
      return false;
    default:
      return false;
  }
};

const handleResponse = promise => promise
  .then(res => ({
    success: isSuccess(res.status),
    errors: [],
  })).catch(res => ({
    success: isSuccess(res.status),
    errors: res.response.data.errors,
  }));

export default class ArticlesRepository {
  constructor(fetcher, isClient) {
    this.fetcher = fetcher;
    this.isClient = isClient;

    this.fetchNewArrivalArticles = this.fetchNewArrivalArticles.bind(this);
    this.fetchFeaturedArticles = this.fetchFeaturedArticles.bind(this);
  }

  fetchArticle(id) {
    return this.fetcher.get(`v1/articles/${id}`)
      .then(res => ({
        article: Article.fromJson(res.data),
      }));
  }

  fetchNewArrivalArticles(cursor = Date(), limit = 15) {
    return this.fetcher.get('v1/articles/', {
      params: {
        cursor,
        limit,
      },
    }).then(res => ({
      articles: res.data.data.map(article => Article.fromJson(article)),
      cursor: res.data.paging.cursor,
      hasNext: res.data.paging.has_next,
    }));
  }

  fetchFeaturedArticles(cursor, limit = 15) {
    return this.fetcher.get('v1/articles/trend', {
      params: {
        cursor,
        limit,
      },
    }).then(res => ({
      articles: res.data.data.map(article => Article.fromJson(article)),
      cursor: res.data.paging.cursor,
      hasNext: res.data.paging.has_next,
    }));
  }

  fetchArticleReviews(id, cursor = Date(), limit = 10) {
    return this.fetcher.get(`v1/articles/${id}/reviews`, {
      params: {
        cursor,
        limit,
      },
    }).then(res => ({
      reviews: res.data.data.map(review => Review.fromJson(review)),
      cursor: res.data.paging.cursor,
      hasNext: res.data.paging.has_next,
      isClient: this.isClient,
    }));
  }

  createArticle(url, text, rating) {
    return handleResponse(this.fetcher.post('v1/articles', {
      url,
      text,
      rating,
    }));
  }

  createReview(id, text, rating) {
    return handleResponse(this.fetcher.post(`v1/articles/${id}/reviews`, {
      text,
      rating,
    }));
  }

  createLike(reviewId) {
    return handleResponse(this.fetcher.post(`v1/reviews/${reviewId}/like`));
  }

  deleteLIke(reviewId) {
    return this.fetcher.delete(`v1/reviews/${reviewId}/like`).then(res => ({
      // エラー処理の時はここを決める。
      res,
    }));
  }
}
