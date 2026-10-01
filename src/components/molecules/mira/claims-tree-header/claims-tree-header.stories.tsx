import { type Meta, type StoryObj } from '@storybook/nextjs';
import { ClaimsTreeHeader } from './claims-tree-header';
import { dmSans, poppins } from '../../../fonts/mira';

const meta: Meta<typeof ClaimsTreeHeader> = {
  title: 'Molecules/Mira/ClaimsTreeHeader',
  component: ClaimsTreeHeader,
  decorators: [
    (Story) => (
      <div className={`${dmSans.variable} ${poppins.variable}`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: {
      modes: {
        small: {
          viewport: 'small',
        },
        medium: {
          viewport: 'medium',
        },
        large: {
          viewport: 'large',
        },
        extraLarge: {
          viewport: 'extraLarge',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClaimsTreeHeader>;

export const Default: Story = {
  args: {
    title: 'Claims tree',
  },
};

export const WithBackLink: Story = {
  args: {
    title: 'Study 1',
    backLink: {
      label: 'Claims tree',
      href: '#',
    },
  },
};

export const WithNavigation: Story = {
  args: {
    title: 'Question 1',
    backLink: {
      label: 'Claims tree',
      href: '#',
    },
    navigation: {
      nextHref: '#',
    },
  },
};

export const WithRelatedItems: Story = {
  args: {
    title: 'Claim 1',
    titleSupplementary: '(question 1)',
    backLink: {
      label: 'Question 1',
      href: '#',
    },
    navigation: {
      nextHref: '#',
    },
    relatedItems: ['Figure', 'Study 2'],
  },
};
