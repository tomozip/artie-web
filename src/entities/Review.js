// utils
import * as assertions from '../utils/assertion';

// entities
import User from './User';

export default class Review {
  constructor(params) {
    const {
      id,
      text,
      postedAt,
      likesCount,
      rating,
      user,
    } = params;

    this.id = assertions.number('id', id);
    this.text = assertions.string('text', text);
    this.postedAt = assertions.string('postedAt', postedAt);
    this.likesCount = assertions.number('likesCount', likesCount);
    this.rating = assertions.number('rating', rating);
    this.user = assertions.object('user', user);
  }

  static fromJson(json) {
    return new Review({
      id: json.id,
      text: json.text,
      postedAt: json.posted_at,
      likesCount: json.likes_count,
      rating: json.rating,
      user: User.fromJson(json.user),
    });
  }
}
