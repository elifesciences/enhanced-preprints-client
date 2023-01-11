import { classNameVariant } from './class-name-variant';

describe('Class Variant', () => {
  it('returns string prefixed', () => {
    const result = classNameVariant('bar', 'foo');

    expect(result).toStrictEqual('foo--bar');
  });

  it('returns empty string if text is undefined', () => {
    const result = classNameVariant(undefined, 'foo');

    expect(result).toStrictEqual('');
  });

  it('can override the default separator', () => {
    const result = classNameVariant('bar', 'other foo', '-');

    expect(result).toStrictEqual('other foo-bar');

    const result2 = classNameVariant('bar', ' other foo---', '');

    expect(result2).toStrictEqual(' other foo---bar');
  });
});
