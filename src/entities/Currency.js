// utils
import * as assertions from '../utils/assertion';

export default class Post {
  constructor(params) {
    const {
      id,
      name,
      createdAt,
      updatedAt,
    } = params;

    this.id = assertions.number('id', id);
    this.name = assertions.string('name', name);
    this.createdAt = assertions.string('createdAt', createdAt);
    this.updatedAt = assertions.string('updatedAt', updatedAt);
  }

  static fromJson(json) {
    return new Post({
      id: json.id,
      name: json.name,
      createdAt: json.created_at,
      updatedAt: json.updated_at,
    });
  }
}
