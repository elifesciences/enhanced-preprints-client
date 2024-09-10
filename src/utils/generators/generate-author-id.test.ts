import { generateAuthorId } from './generate-author-id';
import { authors } from '../mocks';

describe('CreateAuthorId', () => {
  it('should return a string starting with an x', () => {
    const id = generateAuthorId(authors[0]);

    expect(id.at(0)).toStrictEqual('x');
  });

  it('should return a string starting with the correct id for the author', () => {
    const id = generateAuthorId(authors[0]);

    expect(id).toStrictEqual('x1783430253');
  });
});
