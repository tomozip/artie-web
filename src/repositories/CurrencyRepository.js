import Currency from '../entities/Currency';

export default class PostsRepository {
  constructor(fetcher) {
    this.fetcher = fetcher;
  }

  fetchCurrencies(cursor = Date(), limit = 10) {
    return this.fetcher.get('v1/currencies/', {
      params: {
        cursor,
        limit,
      },
    }).then(res => ({
      currencies: res.data.data.map(currency => Currency.fromJson(currency)),
      cursor: res.data.cursor,
    }));
  }

  // createPost(userId = 1, text = '', images = []) {
  //   return this.fetcher.post('v1/posts/', {
  //     user_id: userId,
  //     text,
  //     image_data: images,
  //   }).then(res => ({
  //     success: res.data.success,
  //     posts: res.data.data.map(post => Post.fromJson(post)),
  //   }));
  // }
}
