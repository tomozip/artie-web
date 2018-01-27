// utils
import * as assertions from '../utils/assertion';

// TODO: setting

export default class Review {
  constructor(params) {
    const {
      id,
      text,
      postedAt,
      likesCount,
      rating,
    } = params;

    this.id = assertions.number('id', id);
    this.text = assertions.string('text', text);
    this.postedAt = assertions.string('postedAt', postedAt);
    this.likesCount = assertions.number('likesCount', likesCount);
    this.rating = assertions.number('rating', rating);
  }

  static fromJson(json) {
    return new Review({
      id: json.id,
      text: json.text,
      postedAt: json.created_at,
      likesCount: json.review_count_number,
      rating: json.rating,
    });
  }
}
