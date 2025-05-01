export const generateNameWithVersionSuffix = (
  name: string,
  version: number,
  lastVersion: number,
): string => {
  if (lastVersion === 1) {
    return `${name}_only_version`;
  }

  if (version === 1) {
    return `${name}_first_version`;
  }

  if (version === lastVersion) {
    return `${name}_last_version`;
  }

  return name;
};
