export const makeNullableOptional = <T>(input: T | null): T | undefined => {
  if (input !== null) return input;

  return undefined;
};
