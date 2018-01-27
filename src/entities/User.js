// utils
import * as assertions from '../utils/assertion';

export default class Hashtag {
  constructor(params) {
    const {
      id,
      fullName,
      accountName,
      imageData,
      email,
      password,
      evaluationPoint,
      totalLikeCount,
      followingCount,
      followersCount,
    } = params;

    this.id = assertions.number('id', id);
    this.fullName = assertions.string('fullName', fullName);
    this.accountName = assertions.string('accountName', accountName);
    this.imageData = assertions.string('imageData', imageData);
    this.email = assertions.string('email', email, true);
    this.password = assertions.string('password', password, true);
    this.evaluationPoint = assertions.number('evaluationPoint', evaluationPoint);
    this.totalLikeCount = assertions.number('totalLikeCount', totalLikeCount);
    this.followingCount = assertions.number('followingCount', followingCount);
    this.followersCount = assertions.number('followersCount', followersCount);
  }

  static fromJson(json) {
    return new Hashtag({
      id: json.id,
      fullName: json.display_name,
      accountName: json.account_name,
      imageData: json.image_data,
      email: json.email ? null : json.email,
      password: json.password ? null : json.password,
      evaluationPoint: json.evaluation_point,
      totalLikeCount: json.total_like_count,
      followingCount: json.follwing_count,
      followersCount: json.follwers_count,
    });
  }
}
