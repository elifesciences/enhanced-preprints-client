import { type JSX } from 'react';
import './reference-list.scss';
import { Reference, type ReferenceProps } from '../reference/reference';

type ReferenceListItemProps = ReferenceProps & { id: string };

export const ReferenceList = ({ references }: { references: ReferenceListItemProps[] }): JSX.Element => (
  <section>
    <h1 id="references" className="heading-1">References</h1>
    <ul className="reference-list">
      {references.map((reference, index) => (
        <li key={index} className="reference-list__item" id={reference.id}>
          <Reference reference={reference} />
        </li>
      ))}
    </ul>
  </section>
);
