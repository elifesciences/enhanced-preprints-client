import './abstract.scss';
import { contentToJsx } from '../../../utils/content';
import { Content } from '../../../types';

export const Abstract = ({ content }: { content: Content }) => (
  <section className="abstract">
    <h1 id="abstract">Abstract</h1>
    {contentToJsx(content)}
  </section>
);
