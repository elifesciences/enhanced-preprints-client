import {
  useState,
} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Modal } from './modal';
import { Socials } from '../../atoms/socials/socials';
import { Clipboard } from '../../atoms/clipboard/clipboard';
import { Reference } from '../../atoms/reference/reference';
import { references } from '../../../utils/mocks';
import { Reference as ReferenceData } from '../../../types';

export default {
  title: 'Molecules/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => { setShowModal(true); }}>Modal Link</button>
      <Modal {...args} open={showModal} onModalClose={() => { setShowModal(false); }} />
    </>
  );
};

export const ModalContainer = Template.bind({});
ModalContainer.args = {
  modalTitle: 'This is a title',
  children: (<>This is content</>),
};

export const ModalShare = Template.bind({});
ModalShare.args = {
  modalTitle: 'Share this article',
  children: (<>
    <div className="form-item">
      <input type="input" className="text-field text-field--clipboard" value={'https://doi.org/10.7554/eLife.09560'} />
    </div>
    <Clipboard text={'https://doi.org/10.7554/eLife.09560'} />
    <Socials shareUrl='www.google.com' title='I am a title' />
  </>),
};

const formatReference = (reference: ReferenceData): string => {
  const authors = reference.authors.reduce((previous, author) => `${previous}${previous !== '' ? ', ' : ''}${author.familyNames?.join(' ')} ${author.givenNames?.join(' ')}`, '');
  const year = new Date(reference.datePublished).getFullYear();
  const journal = reference.isPartOf?.isPartOf?.name ?? reference.isPartOf?.name;
  const doiIdentifier = reference.identifiers?.find((identifier) => identifier.name === 'doi');

  return `${authors} (${year}) ${reference.title}${journal ? ` ${journal}` : ''}${doiIdentifier ? `\n\nhttps://doi.org/${doiIdentifier.value}` : ''}`;
};

export const ModalCite = Template.bind({});
ModalCite.args = {
  modalTitle: 'Cite this article',
  children: (<>
    <Reference isReferenceList={false} reference={references[0]} />
    <Clipboard text={formatReference(references[0])} />
  </>),
};
