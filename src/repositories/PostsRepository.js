import Post from '../entities/Post';

export default class PostsRepository {
  constructor(fetcher) {
    this.fetcher = fetcher;
  }

  fetchFeedPosts(cursor = Date(), limit = 10) {
    return this.fetcher.get('v1/posts/', {
      params: {
        cursor,
        limit,
      },
    }).then(res => ({
      posts: res.data.data.map(post => Post.fromJson(post)),
      cursor: res.data.cursor,
    }));
  }

  fetchCurrencyPosts(currencyId, cursor = Date(), limit = 10) {
    return this.fetcher.get(`v1/currencies/${currencyId}/posts`, {
      params: {
        cursor,
        limit,
        content_id: currencyId,
      },
    }).then(res => ({
      posts: res.data.data.map(post => Post.fromJson(post)),
      cursor: res.data.cursor,
    }));
  }

  createPost(userId = 1, text = '', images = []) {
    return this.fetcher.post('v1/posts/', {
      user_id: userId,
      text,
      image_url: images,
    }).then(res => ({
      success: res.data.success,
      posts: res.data.data.map(post => Post.fromJson(post)),
    }));
  }

  deletePost(postId) {
    return this.fetcher.delete(`v1/posts/${postId}`)
      .then(res => ({
        success: res.data.success,
        posts: res.data.data.map(post => Post.fromJson(post)),
      }));
  }
}
