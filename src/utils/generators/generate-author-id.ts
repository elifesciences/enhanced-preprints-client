import { str } from 'crc-32';

export const generateAuthorId = (author: object): string => `x${str(JSON.stringify(author))}`;
