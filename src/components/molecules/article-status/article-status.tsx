import { useState } from 'react';
import { Button } from '../../atoms/button/button';
import { Clipboard } from '../../atoms/clipboard/clipboard';
import { Socials } from '../../atoms/socials/socials';
import { Modal } from '../modal/modal';
import './article-status.scss';

type ArticleStatusProps = {
  articleType?: string,
  articleStatus: string,
  shareUrl: string,
  title: string,
  pdfUrl?: string,
};

const defaultArticleType = 'Reviewed Preprint';

export const ArticleStatus = ({
  articleType = defaultArticleType, articleStatus, shareUrl, title, pdfUrl,
}: ArticleStatusProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false);

  return <div className="article-status">
      <h2 className="article-status__heading">{articleType}</h2>
      <p className="article-status__text">{articleStatus}</p>
      <a href="https://elifesciences.org/peer-review-process" className="article-status__link">About eLife&apos;s process</a>
      <ul className="article-actions">
        { pdfUrl && (
          <li className="article-actions__list-item">
            <Button text="Download" iconName="download" variant="action" url={pdfUrl}/>
          </li>
        )}
        <li>
          <Button text="Share" iconName="share" variant="action" onClick={() => setShowModal(true)} />
        </li>
      </ul>
      <Modal modalTitle={'Share'} open={showModal} onModalClose={() => setShowModal(false)}>
        <div className="form-item">
          <input type="input" className="text-field text-field--clipboard" value={`https://doi.org/${shareUrl}`} />
          <Clipboard text={`https://doi.org/${shareUrl}`} />
        </div>
        <Socials shareUrl={shareUrl} title={title} />
      </Modal>
    </div>;
};
