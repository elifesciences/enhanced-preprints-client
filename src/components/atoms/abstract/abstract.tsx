import './abstract.scss';
import { type Content } from '../../../types';
import { contentToJsx } from '../../../utils/content';

export const Abstract = ({ content }: { content: Content }) => (
  <section className="abstract">
    <h1 id="abstract">Abstract</h1>
    {contentToJsx(content)}
  </section>
);
