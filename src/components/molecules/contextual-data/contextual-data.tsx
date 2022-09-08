import './contextual-data.scss';

type ContextualDataProps = {
  views: number;
  citation: number,
  tweets: number,
};

export const ContextualData = ({ views, citation, tweets }: ContextualDataProps): JSX.Element => (
  <ul className="contextual-data">
    <li className="contextual-data__item"><span class="contextual-data__item--highlight">{views}</span> views</li>
    <li className="contextual-data__item"><span class="contextual-data__item--highlight">{citation}</span> citation</li>
    <li className="contextual-data__item"><span class="contextual-data__item--highlight">{tweets}</span> tweets</li>
  </ul>
);
