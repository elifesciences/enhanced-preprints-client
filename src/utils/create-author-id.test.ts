import { createAuthorId } from './create-author-id';
import { authors } from './mocks';

describe('CreateAuthorId', () => {
  it('should return a string starting with an x', () => {
    const id = createAuthorId(authors[0]);

    expect(id.at(0)).toStrictEqual('x');
  });

  it('should return a string starting with the correct id for the author', () => {
    const id = createAuthorId(authors[0]);

    expect(id).toStrictEqual('x-666072093');
  });
});
