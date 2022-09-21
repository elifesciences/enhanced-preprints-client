import { useEffect, useState } from 'react';
import styles from './article-content.module.scss';
import { contentToJsx } from '../../../utils/content-to-jsx';
import { Content } from '../../../types/content';

export const ArticleContent = ({ doi }: { doi: string }): JSX.Element => {
  const [content, setContent] = useState<Content>('Loading article...');
  useEffect(() => {
    fetch(`/api/article/${doi}/content`)
      .then((res) => res.json())
      .then((json) => setContent(json))
      .catch(() => setContent('Unable to load article'));
  }, [doi]);

  return (
    <article className={styles['article-body']}>{contentToJsx(content)}</article>
  );
};
