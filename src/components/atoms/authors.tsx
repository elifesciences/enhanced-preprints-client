import './authors.scss';

type Author = {
  givenNames: string[],
  familyNames: string[],
}

export const Authors = ({authors}: {authors: Author[]}): JSX.Element => (
  <ol className="authors-list">
    {authors.map(({givenNames, familyNames}, index) => (
      <li className="authors-list__item" key={index}>
        {givenNames.join(' ')} {familyNames.join('')}
      </li>
    ))}
  </ol>
);
