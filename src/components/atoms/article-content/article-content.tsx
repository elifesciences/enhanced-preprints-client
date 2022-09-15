import './article-content.scss';
import { useEffect, useState } from 'react';
import { contentToJsx } from '../../../utils/content-to-jsx';
import { Content } from '../../../types/content';

export const ArticleContent = ({ doi }: { doi: string }): JSX.Element => {
  const [content, setContent] = useState<Content>('Loading article...');
  useEffect(() => {
    fetch(`http://localhost:3000/content/${doi}`)
      .then((res) => res.json())
      .then((json) => setContent(json))
      .catch(() => setContent('Unable to load article'));
  }, [doi]);

  return (
    <article className="article-body">{contentToJsx(content)}</article>
  );
};
