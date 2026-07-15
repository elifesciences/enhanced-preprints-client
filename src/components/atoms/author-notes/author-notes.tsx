import { type JSX } from 'react';
import './author-notes.scss';
import { type FulltextTabProps } from '../../pages/article/tabs/fulltext-tab';

export const AuthorNotes = ({ authorNotes }: { authorNotes: FulltextTabProps['metaData']['authorNotes'] }): JSX.Element => (
  (
    <div className="author-notes">
      <h3 className="author-notes__title">Author Notes</h3>
      <ul className="author-notes__list">
        { authorNotes.map(({ text }, index) => <p key={index} className="author-notes__list_item">{text}</p>)}
      </ul>
    </div>
  )
);
