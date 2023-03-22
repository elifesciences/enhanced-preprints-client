import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../../atoms/button/button';
import { Clipboard } from '../../atoms/clipboard/clipboard';
import { Socials } from '../../atoms/socials/socials';
import { Modal } from '../modal/modal';
import './article-status.scss';
import { Citation, CitationData } from '../../atoms/citation/citation';

type ArticleStatusProps = {
  articleType?: string,
  articleStatus: string,
  doi: string,
  title: string,
  pdfUrl?: string,
  citation: CitationData,
};

const defaultArticleType = 'Reviewed Preprint';

const formatStringCitation = (citation: CitationData): string => {
  const authors = citation.authors.reduce((previous, author) => `${previous}${previous !== '' ? ', ' : ''}${author.familyNames?.join(' ')} ${author.givenNames?.join(' ')}`, '');

  return `${authors} (${citation.year}) ${citation.title} ${citation.journal} ${citation.volume}:${citation.id}\n\nhttps://doi.org/${citation.doi}`;
};

export const ArticleStatus = ({
  articleType = defaultArticleType, articleStatus, doi, title, pdfUrl, citation,
}: ArticleStatusProps): JSX.Element => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCiteModal, setShowCiteModal] = useState(false);
  const router = useRouter();
  const downloadPath = router.query.msid;

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
        <li className="article-actions__list-item">
          <Button text="Cite" iconName="citation" variant="action" onClick={() => setShowCiteModal(true)} />
        </li>
        <li className="article-actions__list-item">
          <Button text="Share" iconName="share" variant="action" onClick={() => setShowShareModal(true)} />
        </li>
      </ul>
      <Modal modalTitle={'Share this article'} open={showShareModal} onModalClose={() => setShowShareModal(false)} modalLayout="share">
        <div className="form-item">
          <input readOnly={true} type="input" className="text-field text-field--clipboard" value={`https://doi.org/${doi}`} />
          <Clipboard text={`https://doi.org/${doi}`} />
        </div>
        <Socials doi={doi} title={title} />
      </Modal>
      <Modal modalTitle={'Cite this article'} open={showCiteModal} onModalClose={() => setShowCiteModal(false)} modalLayout="cite">
        <Citation citation={citation} />
        {/* TO-DO: Style Download button */}
        <div className="">
          <Clipboard text={formatStringCitation(citation)} />
          <Button iconName="download" variant="action" text="BibTeX" url={`/reviewed-preprints/${downloadPath}.bib`} />
        </div>
      </Modal>
    </div>;
};
