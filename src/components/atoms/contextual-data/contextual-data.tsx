import './contextual-data.scss';
import pluralize from 'pluralize';
import { type JSX } from 'react';

export type ContextualDataProps = {
  views: number;
  citations: number;
  downloads: number;
};

export const ContextualData = ({ views, citations, downloads }: ContextualDataProps): JSX.Element => (
  <ul className="contextual-data">
    <li className="contextual-data__item"><a className="contextual-data__item--link" href="#metrics"><span className="contextual-data__item--highlight">{views}</span> {pluralize('view', views)}</a></li>
    <li className="contextual-data__item"><a className="contextual-data__item--link" href="#metrics"><span className="contextual-data__item--highlight">{downloads}</span> {pluralize('download', downloads)}</a></li>
    <li className="contextual-data__item"><a className="contextual-data__item--link" href="#metrics"><span className="contextual-data__item--highlight">{citations}</span> {pluralize('citation', citations)}</a></li>
  </ul>
);
