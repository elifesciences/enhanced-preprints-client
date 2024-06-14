import { DatesToStrings, stringsToDates } from './type-converters';

describe('Type Converters', () => {
  it('converts strings to dates', () => {
    type Foo = {
      foo: Date,
    };
    const input: DatesToStrings<Foo> = {
      foo: '2022-01-13',
    };
    const output = stringsToDates<Foo>(input);

    expect(output.foo).toEqual(expect.any(Date));
  });
});
