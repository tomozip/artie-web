// entities
import Article from '../entities/Article';
import Review from '../entities/Review';

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
      // エラー処理の時はここを決める。
      res,
    }));
  }

  deleteLIke(reviewId) {
    return this.fetcher.delete(`v1/reviews/${reviewId}/like`).then(res => ({
      // エラー処理の時はここを決める。
      res,
    }));
  }

  // fetchCurrencyPosts(currencyId, cursor = Date(), limit = 10) {
  //   return this.fetcher.get(`v1/currencies/${currencyId}/articles`, {
  //     params: {
  //       cursor,
  //       limit,
  //       content_id: currencyId,
  //     },
  //   }).then(res => ({
  //     articles: res.data.data.map(article => Article.fromJson(article)),
  //     cursor: res.data.cursor,
  //   }));
  // }
  //
  // createPost(userId = 1, text = '', images = []) {
  //   return this.fetcher.article('v1/articles/', {
  //     user_id: userId,
  //     text,
  //     image_url: images,
  //   }).then(res => ({
  //     success: res.data.success,
  //     articles: res.data.data.map(article => Article.fromJson(article)),
  //   }));
  // }
  //
  // deletePost(postId) {
  //   return this.fetcher.delete(`v1/articles/${postId}`)
  //     .then(res => ({
  //       success: res.data.success,
  //       articles: res.data.data.map(article => Article.fromJson(article)),
  //     }));
  // }
}
