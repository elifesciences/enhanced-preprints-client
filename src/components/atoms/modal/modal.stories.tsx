import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Modal } from './modal';

export default {
  title: 'Atoms/ Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = () => (
  <Modal />
);

export const ModalContainer = Template.bind({});