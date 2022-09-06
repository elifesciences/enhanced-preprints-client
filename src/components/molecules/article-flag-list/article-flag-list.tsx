import './article-flag-list.scss';
import { ArticleFlag } from '../../atoms/article-flag/article-flag';

export type Props = {
  msas: string[],
  importance: string;
  strengthOfEvidence: string,
};

export const ArticleFlagList = ({ msas, strengthOfEvidence, importance }: Props): JSX.Element => (
  <ul className="article-flag-list">
    {msas.map((msa, index) => (
      <li className="article-flag-list__item" key={index}>
        <ArticleFlag flagText={msa} isMSA={true} url={''}/>
      </li>))}
    <li className="article-flag-list__item">
      <ArticleFlag flagText={importance} isMSA={false} url={''}/>
    </li>
    <li className="article-flag-list__item">
      <ArticleFlag flagText={strengthOfEvidence} isMSA={false} url={''}/>
    </li>
  </ul>
);
