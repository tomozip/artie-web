// utils
import * as assertions from '../utils/assertion';

export default class Hashtag {
  constructor(params) {
    const {
      id,
      displayName,
      accountName,
      imageData,
      email,
      password,
      evaluation,
    } = params;

    this.id = assertions.number('id', id);
    this.displayName = assertions.string('displayName', displayName);
    this.accountName = assertions.string('accountName', accountName);
    this.imageData = assertions.string('imageData', imageData);
    this.email = assertions.string('email', email);
    this.password = assertions.string('password', password);
    this.evaluation = assertions.string('evaluation', evaluation);
  }

  static fromJson(json) {
    return new Hashtag({
      id: json.id,
      displayName: json.display_name,
      accountName: json.account_name,
      imageData: json.image_data,
      email: json.email,
      password: json.password,
      evaluation: json.evaluation,
    });
  }
}
