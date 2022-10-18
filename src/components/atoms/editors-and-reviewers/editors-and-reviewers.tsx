import styles from './editors-and-reviewers.module.scss';

export type Participant = {
  name: string,
  role: string,
  institution: string,
};

export const EditorsAndReviewers = ({ participants }: { participants: Participant[] }): JSX.Element => (
  <section className={styles['editors-and-reviewers']}>
    <h2 className={styles['editors-and-reviewers__header']} id="editors-and-reviewers" data-jump-menu-target>Editors</h2>
    <ul className={styles['editors-and-reviewers__list']}>
      {participants.map((participant, index) => (
        <li key={index} className={styles['editors-and-reviewers__person']}>
          <div className={styles['editors-and-reviewers__person-role']}>{participant.role}</div>
          <div className={styles['editors-and-reviewers__person-name']}>{participant.name}</div>
          <div className={styles['editors-and-reviewers__person-affiliation']}>{participant.institution}</div>
        </li>
      ))}
    </ul>
  </section>
);
