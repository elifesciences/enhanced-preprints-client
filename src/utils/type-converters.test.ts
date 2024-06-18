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

  it('converts dates in arrays', () => {
    type Bar = {
      bar: { bar: Date }[],
      bars: Date[],
    };
    const input: DatesToStrings<Bar> = {
      bar: [{ bar: '2022-01-13' }, { bar: '2022-02-13' }],
      bars: ['2022-01-13', '2022-01-13'],
    };
    const output = stringsToDates<Bar>(input);

    expect(output.bar[0].bar).toEqual(expect.any(Date));
    expect(output.bar[0].bar).toStrictEqual(new Date('2022-01-13'));
    expect(output.bar[1].bar).toEqual(expect.any(Date));
    expect(output.bar[1].bar).toStrictEqual(new Date('2022-02-13'));
    expect(output.bars[0]).toEqual(expect.any(Date));
    expect(output.bars[0]).toStrictEqual(new Date('2022-01-13'));
    expect(output.bars[1]).toEqual(expect.any(Date));
    expect(output.bars[1]).toStrictEqual(new Date('2022-02-13'));
  });
});
