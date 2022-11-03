import styles from './review-content.module.scss';

const terms = [
  'landmark', 'fundamental', 'important', 'noteworthy', 'useful', 'flawed', 'tour-de-force', 'compelling', 'convincing', 'solid', 'incomplete', 'inadequate',
];

const highlightTerms = (content: string): string => {
  let highlightedContent = content;
  terms.forEach((term) => {
    highlightedContent = highlightedContent.replace(new RegExp(`([^\\w]+)${term}([^\\w]+)`, 'g'), `$1<strong class="${styles['highlighted-term']}">${term}</strong>$2`);
  });
  return highlightedContent;
};

type Props = { content: string, isAssessment?: boolean, id?: string, setActiveTab?: (index: number) => void };
export const ReviewContent = ({
  content, isAssessment = false, id = '', setActiveTab,
}: Props): JSX.Element => {
  const sectionProps: Record<string, string> = {
    className: `${styles['review-content']}${isAssessment ? ` ${styles['review-content--assessment']}` : ''}`,
  };
  if (isAssessment) {
    sectionProps.id = 'assessment';
  }

  return (
  <section id={id} {...sectionProps}>
    <div className={styles['review-content_body']} dangerouslySetInnerHTML={{ __html: isAssessment ? highlightTerms(content) : content }} />
    {isAssessment ? (
      <ul className={styles['review-content_links']}>
        { setActiveTab && <li className={styles['review-content_links-item']}><a onClick={() => setActiveTab(2)} href="#">Read the peer reviews</a></li> }
        <li className={styles['review-content_links-item']}><a href="https://elifesciences.org/inside-elife/db24dd46">About eLife assessments</a></li>
      </ul>
    ) : ''}
  </section>
  );
};
