import './abstract.scss';
import { contentToJsx } from '../../../utils/content';
import { type Content } from '../../../types';

export const Abstract = ({ content }: { content: Content }) => (
  <section className="abstract">
    <h2 id="abstract">Abstract</h2>
    {contentToJsx(content)}
  </section>
);
