import { StoryFn, Meta } from '@storybook/react';
import { List } from './list';

export default {
  title: 'Atoms/List',
  component: List,
} as Meta<typeof List>;

const Template: StoryFn<typeof List> = (args) => <List {...args} />;

export const BasicList = Template.bind({});
BasicList.args = {
  content: {
    type: 'List',
    items: [
      {
        type: 'ListItem',
        content: [
          { type: 'Paragraph', content: ['1)'] },
          {
            type: 'Paragraph',
            content: [
              // eslint-disable-next-line max-len
              'We showed that the IL-6/JAK/STAT signaling cascade is enriched in human tendinopathic tendons alongside gene signatures typical for fibroblasts and progenitors as well as downstream gene sets suggesting excessive cell proliferation (hypercellularity) and imbalanced extracellular matrix turnover.',
            ],
          },
        ],
      },
      {
        type: 'ListItem',
        content: [
          { type: 'Paragraph', content: ['2)'] },
          {
            type: 'Paragraph',
            content: [
              'We exploited an explant-based assembloid model system to first confirm the causal effect of IL-6 signaling on extrinsic fibroblast progenitor activation, recruitment, and proliferation. We then found additional ',
              { type: 'Emphasis', content: ['in vivo'] },
              ' support for IL-6 dependent recruitment of Scx',
              { type: 'Superscript', content: ['+'] },
              ' fibroblast populations using an Achilles tendon lesion model in IL-6 KO mice.',
            ],
          },
        ],
      },
      {
        type: 'ListItem',
        content: [
          { type: 'Paragraph', content: ['3)'] },
          {
            type: 'Paragraph',
            content: [
              // eslint-disable-next-line max-len
              'We followed the downstream effects of enhanced extrinsic fibroblast progenitor activation and accumulation on the tendon core embedded in our assembloids. Here, we document the emergence of central tendinopathic hallmarks including aberrant (catabolic) matrix turnover, hypercellularity, and hypoxic responses with a stronger fibroblast progenitor presence, which is reduced when IL-6 core signaling is inhibited.',
            ],
          },
        ],
      },
    ],
    order: 'Unordered',
  },
};
