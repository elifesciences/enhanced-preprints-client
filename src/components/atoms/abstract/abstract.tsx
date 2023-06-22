import './abstract.scss';
import { contentToJsx } from '../../../utils/content-to-jsx';
import { Content } from '../../../types';

const abstractHasNoAltHeading = (content: Content): boolean => {
  const firstItem = Array.isArray(content) ? content[0] : content;
  if (typeof firstItem === 'object' && firstItem !== null && 'type' in firstItem) {
    return firstItem.type !== 'Heading';
  }
  return true;
};

export const Abstract = ({ content }: { content: Content }): JSX.Element => (
  <section id="abstract" className="abstract">
    {abstractHasNoAltHeading(content) && <h1>Abstract</h1>}
    {contentToJsx(content)}
  </section>
);
