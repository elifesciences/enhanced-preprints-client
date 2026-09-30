import { type Meta, type StoryObj } from '@storybook/nextjs';
import { ClaimsTreeHeader } from './claims-tree-header';
import { poppins } from '../../../fonts/mira';

const meta: Meta<typeof ClaimsTreeHeader> = {
  title: 'Molecules/Mira/ClaimsTreeHeader',
  component: ClaimsTreeHeader,
  decorators: [
    (Story) => (
      <div className={poppins.variable}>
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
    backLinkLabel: 'Back to claim',
  },
};
