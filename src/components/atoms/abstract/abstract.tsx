import { JSX } from 'react';
import './abstract.scss';
import { contentToJsx } from '../../../utils/content-to-jsx';
import { Content } from '../../../types';

export const Abstract = ({ content }: { content: Content }): JSX.Element => (
  <section className="abstract">
    <h1 id="abstract">Abstract</h1>
    {contentToJsx(content)}
  </section>
);
