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
      { givenNames: ['Steve'], familyNames: ['Rogers'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
      { givenNames: ['Antony'], familyNames: ['Stark'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
      { givenNames: ['Natasha'], familyNames: ['Romanov'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
      { givenNames: ['Bruce'], familyNames: ['Banner'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
      { givenNames: ['Wanda'], familyNames: ['Maximof'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
      { givenNames: ['Bucky'], familyNames: ['Barnes'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
      { givenNames: ['Barry'], familyNames: ['Allen'], affiliations: [{ name: 'Justice League', address: { addressCountry: 'Star City' } }] },
      { givenNames: ['Jesse'], familyNames: ['Quick'], affiliations: [{ name: 'Justice League', address: { addressCountry: 'Star City' } }] },
      { givenNames: ['Kara'], familyNames: ['Zor-el'], affiliations: [{ name: 'Justice League', address: { addressCountry: 'Arctic' } }] },
      { givenNames: ['Kal'], familyNames: ['El'], affiliations: [{ name: 'Justice League', address: { addressCountry: 'Arctic' } }] },
      { givenNames: ['Arthur'], familyNames: ['Curry'], affiliations: [{ name: 'Justice League', address: { addressCountry: 'Arctic' } }] },
      { givenNames: ['Oliver'], familyNames: ['Queen'], affiliations: [{ name: 'Justice League', address: { addressCountry: 'Central City' } }] },
    ],
    headings: [{ id: 's1', text: 'Introduction' }],
    references: exampleReferences,
  },
  status: {
    articleType: 'Reviewed Preprint',
    status: 'This Reviewed Preprint was published after peer review by eLife.',
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
    reviews: [
      {
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
    ],
  },
};
