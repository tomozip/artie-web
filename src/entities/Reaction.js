// utils
import * as assertions from '../utils/assertion';

export default class Reaction {
  constructor(params) {
    const {
      like,
      dislike,
      share,
    } = params;

    this.like = assertions.number('like', like);
    this.dislike = assertions.number('dislike', dislike);
    this.share = assertions.number('share', share);
  }

  static fromJson(json) {
    return new Reaction({
      like: json.like,
      dislike: json.dislike,
      share: json.share,
    });
  }
}
