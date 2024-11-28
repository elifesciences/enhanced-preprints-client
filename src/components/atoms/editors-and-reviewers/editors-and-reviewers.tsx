import './editors-and-reviewers.scss';
import { useTranslation } from 'react-i18next';

type Participant = {
  name: string,
  role: string,
  institution?: string,
};

export const EditorsAndReviewers = ({ participants }: { participants: Participant[] }) => {
  const { t } = useTranslation();
  return (
    <section className="editors-and-reviewers">
      <h2 className="editors-and-reviewers__header" id="editors-and-reviewers" data-jump-menu-target>{t('editors_and_reviewers_title')}</h2>
      <ul className="editors-and-reviewers__list">
        {participants.map((participant, index) => (
          <li key={index} className="editors-and-reviewers__person">
            <div className="editors-and-reviewers__person-role">{t(`role_${participant.role}`)}</div>
            <div className="editors-and-reviewers__person-name">{participant.name}</div>
            { participant.institution && <div className="editors-and-reviewers__person-affiliation">{participant.institution}</div> }
          </li>
        ))}
      </ul>
    </section>
  );
};
