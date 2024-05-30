import {
  useState,
} from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Modal } from './modal';
import { Socials } from '../../atoms/socials/socials';
import { Clipboard } from '../../atoms/clipboard/clipboard';
import { citation, references } from '../../../utils/mocks';
import { Reference as ReferenceData } from '../../../types';
import { Citation } from '../../atoms/citation/citation';

export default {
  title: 'Molecules/Modal',
  component: Modal,
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = (args) => {
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
  modalLayout: 'share',
  children: (<>
    <div className="form-item">
      <input type="input" className="text-field text-field--clipboard" value={'https://doi.org/10.7554/eLife.09560'} />
    </div>
    <Clipboard text={'https://doi.org/10.7554/eLife.09560'} />
    <Socials doi='www.google.com' title='I am a title' />
  </>),
};

const formatReference = (reference: ReferenceData): string => {
  const authors = reference.authors.reduce((previous, author) => `${previous}${previous !== '' ? ', ' : ''}${(author.familyNames ?? []).join(' ')} ${(author.givenNames ?? []).join(' ')}`, '');
  const year = reference.datePublished ? new Date(typeof reference.datePublished === 'string' ? reference.datePublished : reference.datePublished.value).getUTCFullYear() : undefined;
  const journal = reference.isPartOf?.isPartOf?.name ?? reference.isPartOf?.name;
  const doiIdentifier = reference.identifiers?.find((identifier) => identifier.name === 'doi');

  return `${authors} (${year}) ${reference.title}${journal ? ` ${journal}` : ''}${doiIdentifier ? `\n\nhttps://doi.org/${doiIdentifier.value}` : ''}`;
};

export const ModalCite = Template.bind({});
ModalCite.args = {
  modalTitle: 'Cite this article',
  modalLayout: 'cite',
  children: (<>
    <Citation citation={citation} />
    <Clipboard text={formatReference(references[0])} />
  </>),
};
