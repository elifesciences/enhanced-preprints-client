import './abstract.scss';
import { type JSX } from 'react';
import { type Content } from '../../../types';
import { contentToJsx } from '../../../utils/content';

export const Abstract = ({ content }: { content: Content }): JSX.Element => (
  <section className="abstract">
    <h1 id="abstract">Abstract</h1>
    {contentToJsx(content)}
  </section>
);
