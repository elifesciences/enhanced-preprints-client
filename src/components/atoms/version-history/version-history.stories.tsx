import { StoryFn, Meta } from '@storybook/react';
import { VersionHistory } from './version-history';

export default {
  title: 'Atoms/VersionHistory',
  component: VersionHistory,
} as Meta<typeof VersionHistory>;

const Template: StoryFn<typeof VersionHistory> = () => <VersionHistory versions={[
  {
    label: 'Preprint posted',
    date: new Date('2022-11-22'),
    url: 'https://doi.org/10.1101/2022.11.08.515698',
  },
  {
    label: 'Sent for peer review',
    date: new Date('2022-11-28'),
  },
  {
    label: 'Reviewed Preprint version 1',
    date: new Date('2023-01-25'),
    url: 'https://doi.org/10.7554/eLife.85111.1',
  },
  {
    label: 'Reviewed Preprint version 2',
    date: new Date('2023-05-10'),
    url: 'https://doi.org/10.7554/eLife.85111.2',
  },
  {
    label: 'Version of Record published',
    date: new Date('2023-06-07'),
    url: 'https://elifesciences.org/articles/85111v1',
  },
  {
    label: 'Version of Record updated',
    date: new Date('2023-06-15'),
    url: 'https://elifesciences.org/articles/85111v2',
  },
]}/>;

export const VersionHistoryDefault = Template.bind({});
