import { useState } from 'react';
import { Button } from '../../atoms/button/button';
import { Clipboard } from '../../atoms/clipboard/clipboard';
import { Socials } from '../../atoms/socials/socials';
import { Modal } from '../modal/modal';
import './article-status.scss';

type ArticleStatusProps = {
  articleType?: string,
  articleStatus: string,
  pdfUrl: string,
  shareUrl?: string,
};

const defaultArticleType = 'Reviewed Preprint';

export const ArticleStatus = ({
  articleType = defaultArticleType, articleStatus, pdfUrl, shareUrl,
}: ArticleStatusProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  return <div className="article-status">
      <h2 className="article-status__heading">{articleType}</h2>
      <p className="article-status__text">{articleStatus}</p>
      <a href="https://elifesciences.org/peer-review-process" className="article-status__link">About eLife&apos;s process</a>
      <ul className="article-actions">
        <li className="article-actions__list-item">
          <Button text="Download" iconName="download" variant="action" url={pdfUrl}/>
          <Button text="Share" iconName="share" variant="action" onClick={() => setShowModal(true)} />
        </li>
      </ul>
      <Modal modalTitle={'Share'} open={showModal} onModalClose={() => setShowModal(false)}>
        <Clipboard text={'https://doi.org/10.7554/eLife.09560'} />
        <Socials emailUrl={''} facebookUrl={''} twitterUrl={''} linkedinUrl={''} redditUrl={''} />
      </Modal>
    </div>;
};

