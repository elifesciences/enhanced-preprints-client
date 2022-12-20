import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Clipboard } from '../clipboard/clipboard';
import { Modal } from './modal';
import { Socials } from '../socials/socials';

export default {
  title: 'Atoms/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args}><div></div></Modal>
);

export const ModalContainer = Template.bind({});
ModalContainer.args = {
  modalTitle: 'This is a title',
};

const ClipboardTemplate: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args}><Clipboard text={'https://doi.org/10.7554/eLife.09560'} /><Socials emailUrl={''} facebookUrl={''} twitterUrl={''} linkedinUrl={''} redditUrl={''} /></Modal>
);

export const ModalShare = ClipboardTemplate.bind({});
ModalShare.args = {
  modalTitle: 'Share this article',
};
