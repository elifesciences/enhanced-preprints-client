export type DatesToStrings<T> = T extends Date
  ? string
  : T extends Array<infer U>
    ? DatesToStrings<U>[]
    : T extends object
      ? { [K in keyof T]: DatesToStrings<T[K]> }
      : T;

export const stringsToDates = <T extends object>(input: DatesToStrings<T>): T extends Array<T> ? T[] : T => {
  // @ts-ignore
  let output;
  if (Array.isArray(input)) {
    output = input.map(stringsToDates);
  } else if (typeof input === 'object') {
    output = { ...input };
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, val] of Object.entries(output as T)) {
      if (typeof val === 'string' && !Number.isNaN(new Date(val).getTime())) {
        console.log(val);
        output[key] = new Date(val);
      } else if (Array.isArray(output[key])) {
        output[key] = val.map(stringsToDates);
      } else if (typeof val === 'object') {
        output[key] = stringsToDates(val);
      }
    }
  } else if (typeof input === 'string' && !Number.isNaN(new Date(input).getTime())) {
    return new Date(input);
  }

  return output as T;
};
