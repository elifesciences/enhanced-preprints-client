import { Heading } from '../heading/heading';
import './reference-list.scss';
import { type Reference as ReferenceData } from '../../../types';
import { Reference } from '../reference/reference';

export const ReferenceList = ({ references }: { references: ReferenceData[] }) => (
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
