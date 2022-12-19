import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Share } from '../share/share';
import { Modal } from './modal';

export default {
  title: 'Atoms/ Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args}><div></div></Modal>
);

export const ModalContainer = Template.bind({});
ModalContainer.args = {
  modalTitle: 'This is a title',
};

const ShareTemplate: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args}><Share /></Modal>
);

export const ModalShare = ShareTemplate.bind({});
ModalShare.args = {
  modalTitle: 'Share this article',
};
