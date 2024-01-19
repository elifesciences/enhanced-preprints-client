import { StoryFn, Meta } from '@storybook/react';
import { Figure } from './figure';
import { contentToJsx } from '../../../utils/content-to-jsx';

export default {
  title: 'Atoms/Figure',
  component: Figure,
} as Meta<typeof Figure>;

const Template: StoryFn<typeof Figure> = (args) => (
  <Figure {...args} />
);

export const Figure1 = Template.bind({});
Figure1.args = {
  content: contentToJsx({
    type: 'ImageObject',
    meta: {
      inline: false,
    },
    contentUrl: 'https://placekitten.com/800/400',
  }),
};

export const Figure2 = Template.bind({});
Figure2.args = {
  label: 'This is a figure Component',
  caption: contentToJsx([
    {
      type: 'Heading',
      content: 'This is a figure',
      depth: 3,
      id: 'fig1',
    },
    {
      type: 'Paragraph',
      // eslint-disable-next-line max-len
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis fringilla nunc. Pellentesque nec vestibulum sapien, eu feugiat turpis. Maecenas scelerisque at dolor sed venenatis. Nunc tempus, est eu ultricies placerat, magna dui facilisis turpis, et suscipit nunc elit at massa. Mauris sed lectus vulputate lacus aliquet dapibus. Proin accumsan, ligula non maximus molestie, mi tortor facilisis velit, sed hendrerit tortor sapien et purus. Duis ullamcorper nulla sed ante vehicula suscipit et aliquet ligula. Maecenas sollicitudin, odio ut ultricies commodo, nibh massa consectetur nibh, sit amet accumsan magna sapien at tortor. Nunc tempus, erat ut vestibulum molestie, lacus mi mattis ligula, et dignissim erat ex sit amet massa. In vel ornare sapien. Praesent porttitor neque et feugiat ultrices. Nullam sit amet lorem ac nisl dapibus ultrices sit amet eu ex.',
    },
    {
      type: 'Paragraph',
      // eslint-disable-next-line max-len
      content: 'Fusce urna metus, hendrerit in turpis non, hendrerit convallis neque. Curabitur ut mi vel dui convallis rhoncus vitae at est. Nulla facilisi. Nulla fringilla sem nisi, in ullamcorper ex congue sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec ac faucibus ex. Aliquam egestas ante a volutpat dapibus. Nunc non vulputate magna. Vestibulum eget neque nec nibh porta ultricies. Vivamus dictum at libero nec condimentum. Ut ac nunc nec tellus vehicula pharetra. Sed vitae molestie diam.',
    },
  ]),
  id: '1',
  content: contentToJsx({
    type: 'ImageObject',
    meta: {
      inline: false,
    },
    contentUrl: 'https://placekitten.com/800/400',
  }),
};

export const AccessibleFigure = Template.bind({});
AccessibleFigure.args = {
  label: 'Figure 1',
  caption: 'This is a figure',
  id: '1',
  content: contentToJsx({
    type: 'ImageObject',
    meta: {
      inline: false,
    },
    contentUrl: 'https://placekitten.com/800/400',
  }, { altText: 'This is a figure' }),
  labelAriaHidden: false,
  captionAriaHidden: true,
};
