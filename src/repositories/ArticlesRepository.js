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

export default class ArticlesRepository {
  constructor(fetcher) {
    this.fetcher = fetcher;
  }

  fetchArticle(id) {
    return this.fetcher.get(`v1/articles/${id}`)
      .then(res => ({
        article: Article.fromJson(res.data),
      }));
  }

  fetchFeaturedArticles(cursor = Date(), limit = 10) {
    return this.fetcher.get('v1/articles/', {
      params: {
        cursor,
        limit,
      },
    }).then(res => ({
      // articles: res.data.map(article => Article.fromJson(article)),
      articles: res.data.data.map(article => Article.fromJson(article)),
      // cursor: res.data.cursor,
    }));
  }

  fetchArticleReviews(id, cursor = Date(), limit = 10) {
    return this.fetcher.get(`v1/articles/${id}/reviews`, {
      params: {
        cursor,
        limit,
      },
    }).then(res => ({
      // reviews: res.data.map(review => Review.fromJson(review)),
      reviews: res.data.data.map(review => Review.fromJson(review)),
    }));
  }

  createArticle(url, text, rating) {
    return this.fetcher.post('v1/articles', {
      url,
      text,
      rating,
    }).then(res => ({
      // success: isSuccess(res.status),
      // message: res,
      // エラー処理の時はここを決める。
      res,
    }));
  }

  createReview(id, text, rating) {
    return this.fetcher.post(`v1/articles/${id}/reviews`, {
      text,
      rating,
    }).then(res => ({
      // エラー処理の時はここを決める。
      res,
    }));
  }

  createLike(reviewId) {
    return this.fetcher.post(`v1/reviews/${reviewId}/like`).then(res => ({
      success: isSuccess(res.status),
    }));
  }

  deleteLIke(reviewId) {
    return this.fetcher.delete(`v1/reviews/${reviewId}/like`).then(res => ({
      // エラー処理の時はここを決める。
      res,
    }));
  }
}
