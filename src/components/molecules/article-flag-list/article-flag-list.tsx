import { ArticleFlag } from '../../atoms/article-flag/article-flag';
import styles from './article-flag-list.module.scss';

export type Props = {
  msas: string[],
  importance: string;
  strengthOfEvidence: string,
};

export const ArticleFlagList = ({ msas, strengthOfEvidence, importance }: Props): JSX.Element => (
  <ul className={styles['article-flag-list']}>
    {msas.map((msa, index) => (
      <li className={styles['article-flag-list__item']} key={index}>
        <ArticleFlag flagText={msa} isMSA={true} url={''}/>
      </li>))}
    <li className={styles['article-flag-list__item']}>
      <ArticleFlag flagText={importance} isMSA={false} url={''}/>
    </li>
    <li className={styles['article-flag-list__item']}>
      <ArticleFlag flagText={strengthOfEvidence} isMSA={false} url={''}/>
    </li>
  </ul>
);
