import { useState } from 'react';
import { Button } from '../../atoms/button/button';
import { Clipboard } from '../../atoms/clipboard/clipboard';
import { Socials } from '../../atoms/socials/socials';
import { Modal } from '../modal/modal';
import './article-status.scss';
import { Citation, CitationData } from '../../atoms/citation/citation';
import { ContextualData, ContextualDataProps } from '../../atoms/contextual-data/contextual-data';
import { Timeline, TimelineProps } from '../timeline/timeline';

type ArticleStatusProps = {
  doi: string,
  umbrellaDoi: string | undefined,
  title: string,
  pdfUrl?: string,
  citation: CitationData,
  msid: string,
  metrics?: ContextualDataProps,
  timeline: TimelineProps,
};

const formatStringCitation = ({
  authors, doi, eLocationId, journal, title, volume, year,
}: CitationData): string => {
  const authorsList = authors.reduce((previous, author) => `${previous}${previous !== '' ? ', ' : ''}${(author.familyNames ?? []).join(' ')} ${(author.givenNames ?? []).join(' ')}`, '');
  const volumeAndELocationId = `${volume ?? ''}${(volume && eLocationId) ? ':' : ''}${eLocationId ?? ''}`;
  return `${authorsList} (${year}) ${title} ${journal} ${volumeAndELocationId}\n\nhttps://doi.org/${doi}`;
};

export const ArticleStatus = ({
  doi, umbrellaDoi, title, pdfUrl, citation, msid, metrics, timeline,
}: ArticleStatusProps) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCiteModal, setShowCiteModal] = useState(false);

  const altMetrics = () => <section className='altmetric-small-section'>
    <div className='altmetric-embed' data-hide-less-than='1' data-badge-type='donut' data-doi={umbrellaDoi || doi}></div>
    <p className='altmetric-small-section__text'>Altmetric provides a collated score for online attention across various platforms and media.<br/>
      <a href="#metrics" className='see-more-altmetric-details-link'>See more details</a>
    </p>
  </section>;

  return <div className="article-status">
    <Timeline {...timeline} />
    <div className='article-actions-container'>
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
      {metrics && <ContextualData {...metrics} />}
    </div>
    <Modal modalTitle={'Share this article'} open={showShareModal} onModalClose={() => setShowShareModal(false)} modalLayout="share">
      <div className="form-item">
        <input readOnly={true} type="input" className="text-field text-field--clipboard" value={`https://doi.org/${doi}`} />
        <div className="clipboard-container">
          <Clipboard text={`https://doi.org/${doi}`} />
        </div>
      </div>
      <Socials doi={doi} title={title} />
    </Modal>
    <Modal
      modalTitle={'Cite this article'}
      open={showCiteModal}
      onModalClose={() => setShowCiteModal(false)}
      modalLayout="cite"
    >
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
    { metrics && altMetrics() }
  </div>;
};
