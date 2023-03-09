import { str } from 'crc-32';
import { Author } from '../types';

export const createId = (author: Author): string => `x${str(JSON.stringify(author))}`;
