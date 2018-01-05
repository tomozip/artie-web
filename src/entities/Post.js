// utils
import * as assertions from '../utils/assertion';

// entities
import Hashtag from './Hashtag';
import User from './User';
import Reaction from './Reaction';

export default class Post {
  constructor(params) {
    const {
      id,
      text,
      userId,
      createdAt,
      updatedAt,
      hashtags,
      imageData,
      user,
      reaction,
    } = params;

    this.id = assertions.number('id', id);
    this.text = assertions.string('text', text);
    this.userId = assertions.number('userId', userId);
    this.createdAt = assertions.string('createdAt', createdAt);
    this.updatedAt = assertions.string('updatedAt', updatedAt);
    this.hashtags = assertions.array('hashtags', hashtags);
    this.imageData = assertions.array('imageData', imageData);
    this.user = assertions.object('user', user);
    this.reaction = assertions.object('reaction', reaction);
  }

  static fromJson(json) {
    return new Post({
      id: json.id,
      text: json.text,
      userId: json.user_id,
      createdAt: json.created_at,
      updatedAt: json.updated_at,
      hashtags: json.hashtags.map(hashtag => Hashtag.fromJson(hashtag)),
      imageData: json.image_data.map(imageDatum => assertions.string('imageDatum', imageDatum)),
      user: User.fromJson(json.user),
      reaction: Reaction.fromJson(json.reaction),
    });
  }
}
