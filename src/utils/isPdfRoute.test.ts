import { isPdfRoute } from './isPdfRoute';

let mockPathName = '';
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathName,
}));

describe('isPdfRoute', () => {
  it('returns true if the route ends in /pdf', () => {
    mockPathName = 'foo.bar/pdf';
    const result = isPdfRoute();

    expect(result).toStrictEqual(true);
  });

  it('returns false if the route does not end in /pdf', () => {
    mockPathName = 'foo.bar/docx';
    const result = isPdfRoute();

    expect(result).toStrictEqual(false);
  });
});
