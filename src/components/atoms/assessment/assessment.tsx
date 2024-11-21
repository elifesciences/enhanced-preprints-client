import './assessment.scss';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TermsList } from '../terms-list/terms-list';
import {
  findTerms, highlightTerms, significanceTerms, strengthTerms,
} from '../../../utils/terms';
import { Descriptors } from '../descriptors/descriptors';
import { isPdfRoute } from '../../../utils/isPdfRoute';
import { config } from '../../../config';

type Props = { content: string, doi?: string };
export const Assessment = ({ content, doi }: Props) => {
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState<boolean | null>(null);

  const isPdf = isPdfRoute();

  useEffect(() => setExpanded(false), []);

  const { strength, significance } = findTerms(content);

  return config.disableTerms ? (
    <section id="assessment" className="assessment">
      <div className="assessment__body" dangerouslySetInnerHTML={{ __html: content }} />
      {doi && <Descriptors doi={doi}/>}
    </section>
  ) : (
    <section id="assessment" className="assessment">
      <div className="assessment__body" dangerouslySetInnerHTML={{ __html: highlightTerms(content) }} />
      {doi && <Descriptors doi={doi}/>}
      <div className={`assessment-collapsable__${expanded !== false ? 'shown' : 'hidden'}`}>
        { (significance && significance.length > 0) && <TermsList title="Significance of findings" terms={significanceTerms} selectedTerm={significance} /> }
        { (strength && strength.length > 0) && <TermsList title="Strength of evidence" terms={strengthTerms} selectedTerm={findTerms(content).strength || []} /> }
        <p className="assessment__fixed_text">{t('about_assessments_description')} <a href={t('about_assessments_url')}>{t('about_assessments')}</a></p>
      </div>
      {(expanded !== null && !isPdf) &&
        <span role="button" aria-controls="assessment" aria-expanded={expanded}
          className={`explanation_link ${expanded ? 'explanation_link__expanded' : ''}`}
          onClick={() => setExpanded(!expanded)}> {expanded ? 'Show less' : 'Read more about this assessment'}</span>}
    </section>
  );
};
