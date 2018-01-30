// utils
import * as assertions from '../utils/assertion';

export default class Category {
  constructor(params) {
    const {
      id,
      fullName,
      imageUrl,
      followersCount,
      followingsCount,
      totalLikesCount,
      evaluationPoint,
      uId,
      client,
      accessToken,
    } = params;

    this.id = assertions.number('id', id)
    this.fullName = assertions.string('fullName', fullName)
    this.imageUrl = assertions.string('imageUrl', imageUrl)
    this.followersCount = assertions.number('followersCount', followersCount)
    this.followingsCount = assertions.number('followingsCount', followingsCount)
    this.totalLikesCount = assertions.number('totalLikesCount', totalLikesCount)
    this.evaluationPoint = assertions.string('evaluationPoint', evaluationPoint)
    this.uId = assertions.string('uId', uId)
    this.client = assertions.string('client', client)
    this.accessToken = assertions.string('accessToken', accessToken)
  }

  static fromJson(json) {
    return new Category({
      id: json.id,
      fullName: json.full_name,
      imageUrl: json.image_url,
      followersCount: json.followers_count,
      followingsCount: json.followings_count,
      totalLikesCount: json.total_likes_count,
      evaluationPoint: json.evaluation_point,
      uId: json.uid,
      client: json.client,
      accessToken: json.access_token,
    });
  }
}
