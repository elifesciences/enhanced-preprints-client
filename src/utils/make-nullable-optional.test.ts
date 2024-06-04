import { makeNullableOptional } from './make-nullable-optional';

type TestType = {
  one: number,
  two: string,
  three: boolean,
  four: {
    foo: string,
  }
};

describe('make-nullable-optional', () => {
  describe('not null', () => {
    it('returns the value', () => {
      const input = makeNullableOptional(1);

      expect(input).toStrictEqual(1);
    });

    it('returns the value of the correct type', () => {
      const numberInput = makeNullableOptional(1);
      const stringInput = makeNullableOptional('one');
      const booleanInput = makeNullableOptional(true);
      const testObject: TestType = {
        one: 1, two: 'two', three: false, four: { foo: '' },
      };
      const objectInput = makeNullableOptional(testObject);

      expect(numberInput).toEqual(expect.any(Number));
      expect(stringInput).toEqual(expect.any(String));
      expect(booleanInput).toEqual(expect.any(Boolean));
      expect(objectInput).toEqual({
        one: expect.any(Number),
        two: expect.any(String),
        three: expect.any(Boolean),
        four: {
          foo: expect.any(String),
        },
      });
    });
  });

  describe('null', () => {
    it('returns undefined', () => {
      const input = makeNullableOptional(null);

      expect(input).toBeUndefined();
    });
  });
});
