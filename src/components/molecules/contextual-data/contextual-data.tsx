import './contextual-data.scss';

export type ContextualDataProps = {
  views: number;
  citations: number,
  tweets: number,
};

export const ContextualData = ({ views, citations, tweets }: ContextualDataProps) => (
  <ul className="contextual-data">
    <li className="contextual-data__item"><span className="contextual-data__item--highlight">{views}</span> {views === 1 ? 'view' : 'views'}</li>
    <li className="contextual-data__item"><span className="contextual-data__item--highlight">{citations}</span> {citations === 1 ? 'citation' : 'citations'}</li>
    <li className="contextual-data__item"><span className="contextual-data__item--highlight">{tweets}</span> {tweets === 1 ? 'tweet' : 'tweets'}</li>
  </ul>
);
