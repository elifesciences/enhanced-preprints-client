import './editors-and-reviewers.scss';

type Participant = {
  name: string,
  role: string,
  institution: string,
};

const roleToFriendlyRole = (role: string) => {
  if (role === 'senior-editor') {
    return 'Senior Editor';
  }
  if (role === 'editor') {
    return 'Reviewing Editor';
  }

  return role;
};

export const EditorsAndReviewers = ({ participants }: { participants: Participant[] }) => (
  <section className="editors-and-reviewers">
    <h2 className="editors-and-reviewers__header" id="editors-and-reviewers" data-jump-menu-target>Editors</h2>
    <ul className="editors-and-reviewers__list">
      {participants.map((participant, index) => (
        <li key={index} className="editors-and-reviewers__person">
          <div className="editors-and-reviewers__person-role">{roleToFriendlyRole(participant.role)}</div>
          <div className="editors-and-reviewers__person-name">{participant.name}</div>
          <div className="editors-and-reviewers__person-affiliation">{participant.institution}</div>
        </li>
      ))}
    </ul>
  </section>
);
