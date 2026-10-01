import '../../../atoms/abstract/abstract.scss';
import { type JSX } from 'react';
import { contentToJsx, type Content } from '../../../../content';
import { TextCapsule } from '../text-capsule/text-capsule';

export const PrototypeArticleAbstract = ({ content }: { content: Content }): JSX.Element => (
  <section className="abstract">
    <h1 id="abstract">Abstract</h1>
    {contentToJsx(content)}
    <TextCapsule text="Questions 1 and 2 generated from this text" />
  </section>
);
