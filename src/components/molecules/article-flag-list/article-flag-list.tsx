import { ArticleFlag } from '../../atoms/article-flag/article-flag';
import styles from './article-flag-list.module.scss';

export type Props = {
  msas: string[],
};

export const ArticleFlagList = ({ msas }: Props): JSX.Element => (
  <ul className={styles['article-flag-list']}>
    {msas.map((msa, index) => (
      <li className={styles['article-flag-list__item']} key={index}>
        <ArticleFlag flagText={msa} isMSA={true} url={''}/>
      </li>))}
  </ul>
);
