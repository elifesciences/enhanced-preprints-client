import { Author } from '../../../types';
import './citation.scss';

export type CitationData = {
  authors: Author[],
  year: number,
  volume: number,
  journal: string,
  id: string,
  title: string,
  doi: string,
};

const formatName = (author: Author) => `${author.givenNames?.join(' ')} ${author.familyNames?.join(' ')} `;

export const Citation = ({ citation }: { citation: CitationData }): JSX.Element => (
  <div className="citation">
    <ol className="citation__authors_list">
      {citation.authors.map((author, index) => (
        <li key={index} className="citation__author">
          {formatName(author)}
        </li>
      ))}
    </ol>

    <span className="citation__authors_list_suffix">{citation.year}</span>
    <span className="citation__title">{citation.title}</span>
    <span className="citation__origin">
      <i>{citation.journal}</i>
      <b>{citation.volume}:</b>
      {citation.id}
    </span>
    <span className="citation__doi">
      https://doi.org/{citation.doi}
    </span>
  </div>
);
