import { classVariant } from './class-variant';

describe('Class Variant', () => {
  it('returns string prefixed', () => {
    const result = classVariant('bar', 'foo');

    expect(result).toStrictEqual('foo--bar');
  });

  it('returns empty string if text is undefined', () => {
    const result = classVariant(undefined, 'foo');

    expect(result).toStrictEqual('');
  });

  it('can override the default separator', () => {
    const result = classVariant('bar', 'other foo', '-');

    expect(result).toStrictEqual('other foo-bar');

    const result2 = classVariant('bar', ' other foo---', '');

    expect(result2).toStrictEqual(' other foo---bar');
  });
});
