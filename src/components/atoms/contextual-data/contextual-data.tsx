import './contextual-data.scss';

export type ContextualDataProps = {
  views: number;
  citations: number,
  downloads: number,
};

export const ContextualData = ({ views, citations, downloads }: ContextualDataProps) => (
  <ul className="contextual-data">
    <li className="contextual-data__item"><span className="contextual-data__item--highlight">{views}</span> {views === 1 ? 'view' : 'views'}</li>
    <li className="contextual-data__item"><span className="contextual-data__item--highlight">{citations}</span> {citations === 1 ? 'citation' : 'citations'}</li>
    <li className="contextual-data__item"><span className="contextual-data__item--highlight">{downloads}</span> {downloads === 1 ? 'download' : 'downloads'}</li>
  </ul>
);
