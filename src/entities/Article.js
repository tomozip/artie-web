// utils
import * as assertions from '../utils/assertion';

// entities
import Category from './Category';

export default class Article {
  constructor(params) {
    const {
      id,
      url,
      title,
      imageUrl,
      publishedAt,
      categories,
      reviewsCount,
      averageRating,
    } = params;

    this.id = assertions.number('id', id);
    this.url = assertions.string('url', url);
    this.title = assertions.string('title', title);
    this.imageUrl = assertions.string('imageUrl', imageUrl);
    this.publishedAt = assertions.string('publishedAt', publishedAt);
    this.categories = assertions.array('categories', categories);
    this.reviewsCount = assertions.number('reviewsCount', reviewsCount);
    this.averageRating = assertions.string('averageRating', averageRating);
  }

  static fromJson(json) {
    return new Article({
      id: json.id,
      url: json.url,
      title: json.title,
      imageUrl: json.image_url,
      publishedAt: json.published_at,
      categories: json.categories.map(category => Category.fromJson(category)),
      reviewsCount: json.reviews_count,
      averageRating: json.average_rating,
    });
  }
}
