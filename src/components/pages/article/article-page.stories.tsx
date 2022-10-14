import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticlePage, ReviewType } from './article-page';
import { mockContent } from '../../atoms/article-content/mock-content';
import { Reference } from '../../atoms/reference-list/reference-list';

export default {
  title: 'Pages/Article Page',
  component: ArticlePage,
} as ComponentMeta<typeof ArticlePage>;

const Template: ComponentStory<typeof ArticlePage> = (args) => <ArticlePage {...args} />;

const exampleReferences: Reference[] = [
  {
    type: 'Article',
    id: 'c1',
    authors: [
      { type: 'Person', familyNames: ['Afshari'], givenNames: ['FS'] },
      { type: 'Person', familyNames: ['Ptak'], givenNames: ['K'] },
      { type: 'Person', familyNames: ['Khaliq'], givenNames: ['ZM'] },
      { type: 'Person', familyNames: ['Grieco'], givenNames: ['TM'] },
      { type: 'Person', familyNames: ['Slater'], givenNames: ['NT'] },
      { type: 'Person', familyNames: ['McCrimmon'], givenNames: ['DR'] },
      { type: 'Person', familyNames: ['Raman'], givenNames: ['IM'] },
    ],
    datePublished: '2004-01-01T00:00:00.000Z',
    isPartOf: {
      type: 'PublicationVolume',
      isPartOf: { type: 'Periodical', name: 'J. Neurophysiol' },
      volumeNumber: 92,
    },
    pageEnd: 2843,
    pageStart: 2831,
    title: 'Resurgent Na currents in four classes of neurons of the cerebellum',
    identifiers: [
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: '10.7554/eLife.16135',
      },
    ],
  },
  {
    type: 'Article',
    id: 'c2',
    authors: [
      { type: 'Person', familyNames: ['Aryan'], givenNames: ['L'] },
      { type: 'Person', familyNames: ['Younessi'], givenNames: ['D'] },
      { type: 'Person', familyNames: ['Zargari'], givenNames: ['M'] },
      { type: 'Person', familyNames: ['Banerjee'], givenNames: ['S'] },
      { type: 'Person', familyNames: ['Agopian'], givenNames: ['J'] },
      { type: 'Person', familyNames: ['Rahman'], givenNames: ['S'] },
      { type: 'Person', familyNames: ['Borna'], givenNames: ['R'] },
      { type: 'Person', familyNames: ['Ruffenach'], givenNames: ['G'] },
      { type: 'Person', familyNames: ['Umar'], givenNames: ['S'] },
      { type: 'Person', familyNames: ['Eghbali'], givenNames: ['M'] },
    ],
    datePublished: '2020-01-01T00:00:00.000Z',
    isPartOf: { type: 'Periodical', name: 'Int J Mol Sci' },
    pageStart: 21,
    title: 'The Role of Estrogen Receptors in Cardiovascular Disease',
    identifiers: [
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: '10.7554/eLife.16136',
      },
    ],
  },
];

export const ArticlePageStory = Template.bind({});
ArticlePageStory.args = {
  content: mockContent,
  metaData: {
    doi: '10.1101/2022.04.13.488149',
    msid: '123456',
    version: '1',
    pdfUrl: '#',
    msas: ['Mad Science', 'Alchemy'],
    title: 'This is a title',
    authors: [
      { givenNames: ['Steve'], familyNames: ['Rogers'] },
      { givenNames: ['Antony'], familyNames: ['Stark'] },
      { givenNames: ['Natasha'], familyNames: ['Romanov'] },
      { givenNames: ['Bruce'], familyNames: ['Banner'] },
      { givenNames: ['Wanda'], familyNames: ['Maximof'] },
      { givenNames: ['Bucky'], familyNames: ['Barnes'] },
      { givenNames: ['Barry'], familyNames: ['Allen'] },
      { givenNames: ['Jesse'], familyNames: ['Quick'] },
      { givenNames: ['Kara'], familyNames: ['Zor-el'] },
      { givenNames: ['Arthur'], familyNames: ['Curry'] },
      { givenNames: ['Kal'], familyNames: ['El'] },
      { givenNames: ['Oliver'], familyNames: ['Queen'] },
    ],
    headings: [{ id: 's1', text: 'Introduction' }],
    references: exampleReferences,
    institutions: [
      { name: 'Charles Xavier\'s School for Gifted Youngsters', address: { addressCountry: 'West Chester' } },
      { name: 'Star Labs', address: { addressCountry: 'Star City' } },
      { name: 'Avengers Tower', address: { addressCountry: 'New York' } },
      { name: 'Bat Cave', address: { addressCountry: 'Gotham' } },
      { name: 'Arrow Cave', address: { addressCountry: 'Central City' } },
    ],
  },
  status: {
    articleType: 'Reviewed Preprint',
    status: 'This is a reviewed preprint',
    timeline: [
      { name: 'Peer review done', date: '2022-01-02' },
      { name: 'Preprint posted', date: '2022-01-01' },
    ],
  },
  peerReview: {
    evaluationSummary: {
      date: new Date('2022-01-02'),
      participants: [
        {
          institution: 'Somewhere',
          name: 'Dr Stephen Strange',
          role: 'editor',
        },
      ],
      reviewType: ReviewType.EvaluationSummary,
      text: 'This paper is important and is very convincing',
    },
    reviews: [],
  },
};
