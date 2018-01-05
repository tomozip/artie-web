// utils
import * as assertions from '../utils/assertion';

export default class Hashtag {
  constructor(params) {
    const {
      id,
      name,
    } = params;

    this.id = assertions.number('id', id);
    this.name = assertions.string('name', name);
  }

  static fromJson(json) {
    return new Hashtag({
      id: json.id,
      name: json.name,
    });
  }
}
