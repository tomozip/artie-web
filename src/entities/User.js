// utils
import * as assertions from '../utils/assertion';

export default class User {
  constructor(params) {
    const {
      id,
      fullName,
      // accountName,
      imageUrl,
      email,
      evaluationPoint,
      totalLikesCount,
      followingsCount,
      followersCount,
    } = params;

    this.id = assertions.number('id', id);
    this.fullName = assertions.string('fullName', fullName);
    // this.accountName = assertions.string('accountName', accountName);
    this.imageUrl = assertions.string('imageUrl', imageUrl);
    this.email = assertions.string('email', email, true);
    this.evaluationPoint = assertions.string('evaluationPoint', evaluationPoint);
    this.totalLikesCount = assertions.number('totalLikesCount', totalLikesCount);
    this.followingsCount = assertions.number('followingsCount', followingsCount);
    this.followersCount = assertions.number('followersCount', followersCount);
  }

  static fromJson(json) {
    return new User({
      id: json.id,
      fullName: json.full_name,
      // accountName: json.account_name,
      imageUrl: json.image_url,
      email: json.email ? json.email : null,
      evaluationPoint: json.evaluation_point,
      totalLikesCount: json.total_likes_count,
      followingsCount: json.followings_count,
      followersCount: json.followers_count,
    });
  }
}
