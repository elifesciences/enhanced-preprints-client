import { expect, test, describe } from 'bun:test';
import { classNameVariant } from './class-name-variant';

describe('Class Variant', () => {
  test('returns string prefixed', () => {
    const result = classNameVariant('bar', 'foo');

    expect(result).toStrictEqual('foo--bar');
  });

  test('returns empty string if text is undefined', () => {
    const result = classNameVariant(undefined, 'foo');

    expect(result).toStrictEqual('');
  });

  test('can override the default separator', () => {
    const result = classNameVariant('bar', 'other foo', '-');

    expect(result).toStrictEqual('other foo-bar');

    const result2 = classNameVariant('bar', ' other foo---', '');

    expect(result2).toStrictEqual(' other foo---bar');
  });
});
