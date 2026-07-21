import { type JSX } from 'react';
import { Heading } from '../heading/heading';
import './reference-list.scss';
import { Reference, type ReferenceProps } from '../reference/reference';

type ReferenceListItemProps = ReferenceProps & { id: string };

export const ReferenceList = ({ references }: { references: ReferenceListItemProps[] }): JSX.Element => (
  <section>
    <Heading id="references" headingLevel={1} content="References" />
    <ul className="reference-list">
      {references.map((reference, index) => (
        <li key={index} className="reference-list__item" id={reference.id}>
          <Reference reference={reference} />
        </li>
      ))}
    </ul>
  </section>
);
