export const classVariant = (text: string | undefined, prefix: string, separator: string = '--'): string => text !== undefined ? `${prefix}${separator}${text}` : '';
