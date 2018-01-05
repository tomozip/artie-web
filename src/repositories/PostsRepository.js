import Post from '../entities/Post';

export default class PostsRepository {
  constructor(fetcher) {
    this.fetcher = fetcher;
  }

  fetch(contentTypes = [], page = 1, limit = 10) {
    return this.fetcher.get('v1/posts', {
      params: {
        page,
        limit,
        content_type: contentTypes,
      },
    }).then(res => ({
      posts: res.data.data.map(post => Post.fromJson(post)),
      page: res.data.page,
    }));
  }

  createPost(userId = 1, text = '', images = []) {
    return this.fetcher.post('v1/posts/', {
      user_id: userId,
      text,
      image_data: images,
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
