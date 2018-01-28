// utils
import * as assertions from '../utils/assertion';

export default class Category {
  constructor(params) {
    const {
      id,
      name,
    } = params;

    this.id = assertions.number('id', id);
    this.name = assertions.string('name', name);
  }

  static fromJson(json) {
    return new Category({
      id: json.id,
      name: json.name,
    });
  }
}
