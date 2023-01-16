import { Heading } from '../heading/heading';
import './reference-list.scss';
import { Reference as ReferenceData } from '../../../types';
import { Reference } from '../reference/reference';

export const ReferenceList = ({ references }: { references: ReferenceData[] }): JSX.Element => (
  <section>
    <Heading id="references" headingLevel={1} content="References" />
    <ul className="reference-list">
      {references.map((reference, index) => <li key={index}><Reference reference={reference} doiIsLink={true} /></li>)}
    </ul>
  </section>
);
