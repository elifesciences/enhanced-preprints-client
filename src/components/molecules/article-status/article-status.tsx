import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  msid: string,
};

const defaultArticleType = 'Reviewed Preprint';

const formatStringCitation = ({
  authors, doi, eLocationId, journal, title, volume, year,
}: CitationData): string => {
  const authorsList = authors.reduce((previous, author) => `${previous}${previous !== '' ? ', ' : ''}${(author.familyNames ?? []).join(' ')} ${(author.givenNames ?? []).join(' ')}`, '');
  const volumeAndELocationId = `${volume ?? ''}${(volume && eLocationId) ? ':' : ''}${eLocationId ?? ''}`;
  return `${authorsList} (${year}) ${title} ${journal} ${volumeAndELocationId}\n\nhttps://doi.org/${doi}`;
};

export const ArticleStatus = ({
  articleType = defaultArticleType, articleStatus, doi, title, pdfUrl, citation, msid,
}: ArticleStatusProps) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCiteModal, setShowCiteModal] = useState(false);
  const { t } = useTranslation();

  return <div className="article-status">
    <h2 className="article-status__heading">{articleType}</h2>
    <p className="article-status__text">{articleStatus}</p>
    <a href={t('process_url')} className="article-status__link">{ t('status_about', { defaultValue: 'About {{publisher_short}}\'s process', publisher_short: t('publisher_short') }) }</a>
    <ul className="article-actions">
      { pdfUrl && (
      <li className="article-actions__list-item">
        <Button text="Download" iconName="download" variant="action" url={pdfUrl}/>
      </li>
      )}
      <li className="article-actions__list-item">
        <Button text="Cite" iconName="citation" variant="action" rel="nofollow" onClick={() => setShowCiteModal(true)} />
      </li>
      <li className="article-actions__list-item">
        <Button text="Share" iconName="share" variant="action" rel="nofollow" onClick={() => setShowShareModal(true)} />
      </li>
    </ul>
    <Modal modalTitle={'Share this article'} open={showShareModal} onModalClose={() => setShowShareModal(false)} modalLayout="share">
      <div className="form-item">
        <input readOnly={true} type="input" className="text-field text-field--clipboard" value={`https://doi.org/${doi}`} />
        <div className="clipboard-container">
          <Clipboard text={`https://doi.org/${doi}`} />
        </div>
      </div>
      <Socials doi={doi} title={title} />
    </Modal>
    <Modal modalTitle={'Cite this article'} open={showCiteModal} onModalClose={() => setShowCiteModal(false)} modalLayout="cite">
      <Citation citation={citation} />
      <ol className="cite-downloads__list">
        <li className="cite-downloads__list-item">
          <Clipboard text={formatStringCitation(citation)} />
        </li>
        <li className="cite-downloads__list-item">
          <Button variant="cite-download" text="Download BibTeX" url={`/reviewed-preprints/${msid}.bib`} download />
        </li>
        <li className="cite-downloads__list-item">
          <Button variant="cite-download" text="Download RIS" url={`/reviewed-preprints/${msid}.ris`} download />
        </li>
      </ol>
    </Modal>
  </div>;
};
