import { AuthorNotesData } from '../../../types';
import './author-notes.scss';

export const AuthorNotes = ({ authorNotes }: { authorNotes: AuthorNotesData }) => (
  (
    <div className="author-notes">
      <h3 className="author-notes__title">Author Notes</h3>
      <ul className="author-notes__list">
        { authorNotes.map(({ text }, index) => <p key={index} className="author-notes__list_item">{text}</p>)}
      </ul>
    </div>
  )
);
