import Article from '../entities/Article';

export default class ArticlesRepository {
  constructor(fetcher) {
    this.fetcher = fetcher;
  }

  fetchFeaturedArticles(cursor = Date(), limit = 10) {
    return this.fetcher.get('v1/articles/', {
      params: {
        cursor,
        limit,
      },
    }).then(res => ({
      articles: res.data.data.map(article => Article.fromJson(article)),
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
  //     image_data: images,
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
