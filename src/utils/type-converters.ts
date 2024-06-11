// utility type to turn a PageProps defined with Dates into one defined with strings
export type DatesToStrings<T> = T extends Date
  ? string
  : T extends Array<infer U>
    ? DatesToStrings<U>[]
    : T extends object
      ? { [K in keyof T]: DatesToStrings<T[K]> }
      : T;

export const stringToDate = (value: string): Date => new Date(value);
