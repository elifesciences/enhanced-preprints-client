import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Modal } from './modal';

export default {
  title: 'Atoms/ Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args} />
);

export const ModalContainer = Template.bind({});
ModalContainer.args = {
  modalTitle: 'This is a title',
  modalContent: 'This is some content',
};
