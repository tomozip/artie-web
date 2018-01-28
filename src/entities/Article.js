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
      createdAt,
      updatedAt,
      categories,
      reviewCountNumber,
      ratingScore,
    } = params;

    this.id = assertions.number('id', id);
    this.url = assertions.string('url', url);
    this.title = assertions.string('title', title);
    this.imageUrl = assertions.string('imageUrl', imageUrl);
    this.createdAt = assertions.string('createdAt', createdAt);
    this.updatedAt = assertions.string('updatedAt', updatedAt);
    this.categories = assertions.array('categories', categories);
    this.reviewCountNumber = assertions.number('reviewCountNumber', reviewCountNumber);
    this.ratingScore = assertions.number('ratingScore', ratingScore);
  }

  static fromJson(json) {
    return new Article({
      id: json.id,
      url: json.url,
      title: json.title,
      imageUrl: json.image_url,
      createdAt: json.created_at,
      updatedAt: json.updated_at,
      categories: json.categories.map(category => Category.fromJson(category)),
      reviewCountNumber: json.review_count_number,
      ratingScore: json.rating_score,
    });
  }
}
