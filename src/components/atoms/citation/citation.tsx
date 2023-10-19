import { Author } from '../../../types';
import './citation.scss';

export type CitationData = {
  authors: Author[],
  year?: number,
  volume?: string,
  journal: string,
  eLocationId?: string,
  title: string,
  doi: string,
};

const formatName = (author: Author) => `${(author.givenNames ?? []).join(' ')} ${(author.familyNames ?? []).join(' ')}`;

export const Citation = ({ citation }: { citation: CitationData }) => (
  <div className="citation">
    <ol className="citation__authors_list">
      {citation.authors.map((author, index) => (
        <li key={index} className="citation__author">
          {author.type === 'Organization' ? author.name : formatName(author)}
        </li>
      ))}
    </ol>

    {citation.year && <span className="citation__authors_list_suffix">{citation.year}</span>}
    <span className="citation__title">{citation.title}</span>
    <span className="citation__origin">
      <i>{citation.journal}</i>
      {citation.volume && <strong>{citation.volume}</strong>}{(citation.volume && citation.eLocationId) && ':'}
      {citation.eLocationId && citation.eLocationId}
    </span>
    <span className="citation__doi">
      https://doi.org/{citation.doi}
    </span>
  </div>
);
