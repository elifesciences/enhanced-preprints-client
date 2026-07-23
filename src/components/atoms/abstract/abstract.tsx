import './abstract.scss';
import { type JSX } from 'react';
import { contentToJsx } from '../../../content';
import { type Content } from '../../../types';

export const Abstract = ({ content }: { content: Content }): JSX.Element => (
  <section className="abstract">
    <h1 id="abstract">Abstract</h1>
    {contentToJsx(content)}
  </section>
);
