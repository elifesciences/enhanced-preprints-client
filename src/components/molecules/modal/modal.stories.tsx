import {
  useState,
} from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Modal } from './modal';
import { Socials } from '../../atoms/socials/socials';
import { Clipboard } from '../../atoms/clipboard/clipboard';
import { citation, references } from '../../../utils/mocks';
import { type Reference as ReferenceData } from '../../../types';
import { Citation } from '../../atoms/citation/citation';

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Modal',
  component: Modal,
  render: (args) => {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button onClick={() => { setShowModal(true); }}>Modal Link</button>
        <Modal {...args} open={showModal} onModalClose={() => { setShowModal(false); }} />
      </>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const ModalContainer: Story = {
  args: {
    modalTitle: 'This is a title',
    children: (<>This is content</>),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText('Modal Link');

    expect(await canvas.findByText('This is a title')).not.toBeVisible();

    await userEvent.click(canvas.getByText('Modal Link'));
    expect(canvas.getByText('This is a title')).toBeVisible();

    await userEvent.click(canvas.getByText('Close'));
    expect(await canvas.findByText('This is a title')).not.toBeVisible();
  },
};

export const ModalShare: Story = {
  args: {
    modalTitle: 'Share this article',
    modalLayout: 'share',
    children: (<>
      <div className="form-item">
        <input type="input" className="text-field text-field--clipboard" value={'https://doi.org/10.7554/eLife.09560'} />
      </div>
      <Clipboard text={'https://doi.org/10.7554/eLife.09560'} />
      <Socials doi='www.google.com' title='I am a title' />
    </>),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText('Modal Link');

    expect(await canvas.findByText('Share this article')).not.toBeVisible();

    await userEvent.click(canvas.getByText('Modal Link'));
    expect(canvas.getByText('Share this article')).toBeVisible();

    await userEvent.click(canvas.getByText('Close'));
    expect(await canvas.findByText('Share this article')).not.toBeVisible();
  },
};

const formatReference = (reference: ReferenceData): string => {
  const authors = reference.authors.reduce((previous, author) => `${previous}${previous !== '' ? ', ' : ''}${(author.familyNames ?? []).join(' ')} ${(author.givenNames ?? []).join(' ')}`, '');
  const year = reference.datePublished ? new Date(typeof reference.datePublished === 'string' ? reference.datePublished : reference.datePublished.value).getUTCFullYear() : undefined;
  const journal = reference.isPartOf?.isPartOf?.name ?? reference.isPartOf?.name;
  const doiIdentifier = reference.identifiers?.find((identifier) => identifier.name === 'doi');

  return `${authors} (${year}) ${reference.title}${journal ? ` ${journal}` : ''}${doiIdentifier ? `\n\nhttps://doi.org/${doiIdentifier.value}` : ''}`;
};

export const ModalCite: Story = {
  args: {
    modalTitle: 'Cite this article',
    modalLayout: 'cite',
    children: (<>
      <Citation citation={citation} />
      <Clipboard text={formatReference(references[0])} />
    </>),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText('Modal Link');

    expect(await canvas.findByText('Cite this article')).not.toBeVisible();

    await userEvent.click(canvas.getByText('Modal Link'));
    expect(canvas.getByText('Cite this article')).toBeVisible();

    await userEvent.click(canvas.getByText('Close'));
    expect(await canvas.findByText('Cite this article')).not.toBeVisible();
  },
};

export const ModalCiteWithWarning: Story = {
  args: {
    modalTitle: 'Cite this article',
    modalLayout: 'cite',
    modalWarning: 'Warning text',
    children: (<>
      <Citation citation={citation} />
      <Clipboard text={formatReference(references[0])} />
    </>),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText('Modal Link');

    expect(await canvas.findByText('Warning text')).not.toBeVisible();

    await userEvent.click(canvas.getByText('Modal Link'));
    expect(canvas.getByText('Warning text')).toBeVisible();

    await userEvent.click(canvas.getByText('Close'));
    expect(await canvas.findByText('Warning text')).not.toBeVisible();
  },
};
