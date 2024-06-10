import { formatDate } from './format-date';

describe('formatDate', () => {
  it('formats the date', () => {
    expect(formatDate(new Date('2024-05-05'))).toStrictEqual('May 5, 2024');
  });
});
