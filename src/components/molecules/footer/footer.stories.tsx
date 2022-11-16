import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Footer } from './footer';

export default {
  title: 'Molecules/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => <Footer ></Footer>;

export const FooterSection = Template.bind({});
