export type DatesToStrings<T> = T extends Date
  ? string
  : T extends Array<infer U>
    ? DatesToStrings<U>[]
    : T extends object
      ? { [K in keyof T]: DatesToStrings<T[K]> }
      : T;

export const stringsToDates = <T extends object>(input: DatesToStrings<T>): T => {
  // @ts-ignore
  const output = { ...input };
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, val] of Object.entries(output as T)) {
    if (typeof val === 'string' && !Number.isNaN(new Date(val).getTime())) {
      output[key] = new Date(val);
    } else if (Array.isArray(output)) {
      // @ts-ignore
      output[key] = val.map(stringsToDates);
    } else if (typeof val === 'object') {
      output[key] = stringsToDates(val);
    }
  }

  return output as T;
};
