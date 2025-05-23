import { generateGoogleScholarLink } from './generate-google-scholar-link';

describe('generate a google scholar link', () => {
  it('should return a GS link for sample reference', () => {
    const link = generateGoogleScholarLink({
      title: 'Electrostatics of nanosystems: application to microtubules and the ribosome',
      author: ['Baker NA', 'Sept D'],
      publication_year: '2001',
    });

    expect(link).toStrictEqual('https://scholar.google.com/scholar_lookup?title=Electrostatics+of+nanosystems%3A+application+to+microtubules+and+the+ribosome&author=Baker+NA&author=Sept+D&publication_year=2001');
  });
});
