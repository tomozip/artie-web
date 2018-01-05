import assert from 'assert';

const type = (key, val, type, isNullAllowed = false) => {
  if (isNullAllowed) {
    assert(
      typeof val === type || val === null,
      `expects ${key} is a ${type} or null`,
    );
  } else {
    assert(
      typeof val === type,
      `expects ${key} is a ${type}`,
    );
  }
  return val;
};

export const string = (key, val, isNullAllowed = false) => type(key, val, 'string', isNullAllowed);

export const number = (key, val, isNullAllowed = false) => type(key, val, 'number', isNullAllowed);

export const object = (key, val, isNullAllowed = false) => type(key, val, 'object', isNullAllowed);

export const bool = (key, val, isNullAllowed = false) => type(key, val, 'boolean', isNullAllowed);

export const func = (key, val, isNullAllowed = false) => type(key, val, 'function', isNullAllowed);

export const array = (key, val) => {
  assert(
    Array.isArray(val),
    `expects ${key} is an array`,
  );
  return val;
};

export const instance = (key, val, constructor, isNullAllowed = false) => {
  if (isNullAllowed) {
    assert(
      val instanceof constructor || val === null,
      `expects ${key} is an instance of ${constructor} or null`,
    );
  } else {
    assert(
      val instanceof constructor,
      `expects ${key} is an instance of ${constructor}`,
    );
  }
  return val;
};
