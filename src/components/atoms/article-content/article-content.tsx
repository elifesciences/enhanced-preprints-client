import { useEffect, useState } from 'react';
import styles from './article-content.module.scss';
import { contentToJsx } from '../../../utils/content-to-jsx';
import { Content } from '../../../types/content';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export const ArticleContent = ({ doi, content }: { doi: string, content: Content }): JSX.Element => {
  return (
    <article className={styles['article-body']}>{contentToJsx(content)}</article>
  );
};
