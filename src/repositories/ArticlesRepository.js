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
        // article: Article.fromJson(res.data.data),
      }));
  }

  fetchArticleReviews(id) {
    return this.fetcher.get(`v1/articles/${id}/reviews`)
      .then(res => ({
        reviews: res.data.map(review => Review.fromJson(review)),
        // reviews: res.data.data.map(review => Review.fromJson(review)),
      }));
  }

  fetchFeaturedArticles(cursor = Date(), limit = 10) {
    return this.fetcher.get('v1/articles/', {
      params: {
        cursor,
        limit,
      },
    }).then(res => ({
      articles: res.data.map(article => Article.fromJson(article)),
      // articles: res.data.data.map(article => Article.fromJson(article)),
      cursor: res.data.cursor,
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
  //     image_data: images,
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
