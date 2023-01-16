import {
  useState,
} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Modal } from './modal';
import { Socials } from '../../atoms/socials/socials';
import { Clipboard } from '../../atoms/clipboard/clipboard';
import { ReferenceList } from '../../atoms/reference-list/reference-list';
import { references } from '../../../utils/mocks';

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
    <Clipboard text={'https://doi.org/10.7554/eLife.09560'} />
    <Socials emailUrl={''} facebookUrl={''} twitterUrl={''} linkedinUrl={''} redditUrl={''} />
  </>),
};

export const ModalCite = Template.bind({});
ModalCite.args = {
  modalTitle: 'Share this article',
  children: (<>
    <ReferenceList references={references} />
    <div className="downloads-container">
      <div className="form-item">
        <button className='button'>Copy to clipboard</button>
        <button className='button button--action'>Download BIBTEX</button>
        <button className='button button--action'>Download .RIS</button>
      </div>
    </div>

  </>),
};
