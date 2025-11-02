import { str } from 'crc-32';
import { type Author } from '../../types';

export const generateAuthorId = (author: Author): string => `x${str(JSON.stringify(author))}`;
