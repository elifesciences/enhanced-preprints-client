import './contextual-data.scss';

export type ContextualDataProps = {
  views: number;
  citations: number;
  downloads: number;
};

export const ContextualData = ({ views, citations, downloads }: ContextualDataProps) => (
  <ul className="contextual-data">
    <li className="contextual-data__item"><a className="contextual-data__item--link" href="#metrics"><span className="contextual-data__item--highlight">{views}</span> {views === 1 ? 'view' : 'views'}</a></li>
    <li className="contextual-data__item"><a className="contextual-data__item--link" href="#metrics"><span className="contextual-data__item--highlight">{citations}</span> {citations === 1 ? 'citation' : 'citations'}</a></li>
    <li className="contextual-data__item"><a className="contextual-data__item--link" href="#metrics"><span className="contextual-data__item--highlight">{downloads}</span> {downloads === 1 ? 'download' : 'downloads'}</a></li>
  </ul>
);
