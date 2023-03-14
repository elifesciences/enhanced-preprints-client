import { str } from 'crc-32';
import { Author } from '../types';

export const createAuthorId = (author: Author): string => `x${str(JSON.stringify(author))}`;
