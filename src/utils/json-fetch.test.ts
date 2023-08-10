// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'fetch-mock';
import { jsonFetch } from './json-fetch';

describe('jsonFetch', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('returns the data when fetch returns a successful response', async () => {
    fetchMock.mock('http://example.com', {
      status: 200,
      body: { data: '12345' },
    });

    const result = await jsonFetch<{ data: string }>('http://example.com');

    expect(result).toEqual({ data: '12345' });
    expect(fetchMock.called('http://example.com')).toBe(true);
  });

  it('returns null and logs an error when fetch returns a non-ok response', async () => {
    fetchMock.mock('http://example.com', 500);

    // eslint-disable-next-line no-console
    console.error = jest.fn();

    const result = await jsonFetch<{ data: string }>('http://example.com');

    expect(result).toBeNull();
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledWith(new Error('error fetching (http://example.com): Internal Server Error'));
  });

  it('returns null and logs an error when fetch throws an error', async () => {
    fetchMock.mock('http://example.com', () => {
      throw new Error('fake error');
    });

    // eslint-disable-next-line no-console
    console.error = jest.fn();

    const result = await jsonFetch<{ data: string }>('http://example.com');

    expect(result).toBeNull();
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledWith(new Error('fake error'));
  });
});
