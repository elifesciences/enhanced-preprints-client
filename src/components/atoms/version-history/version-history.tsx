import './version-history.scss';

type Props = {
  versions: {
    label: string,
    date: Date,
    url?: string,
  }[]
};

export const VersionHistory = ({ versions }: Props) => (
  <section className="version-history">
    <h3>Versions</h3>
    <ul>
      <li>
        <a href="https://doi.org/10.1101/2022.11.08.515698"><span>Preprint posted: </span></a>
        <time>November 22, 2022</time>
      </li>
      <li>
        <span>Sent for peer review: </span>
        <time>November 28, 2022</time>
      </li>
      <li>
        <a href="https://doi.org/10.7554/eLife.85111.1"><span>Reviewed Preprint version 1: </span></a>
        <time>January 25, 2023</time>
      </li>
      <li>
        <a href="https://doi.org/10.7554/eLife.85111.2"><span>Reviewed Preprint version 2: </span></a>
        <time>May 10, 2023</time>
      </li>
      <li>
        <a href="https://elifesciences.org/articles/85111"><span>Version of Record published: </span></a>
        <time>June 7, 2023</time>
      </li>
      <li>
        <a href="https://elifesciences.org/articles/85111"><span>Version of Record updated: </span></a>
        <time>June 15, 2023</time>
      </li>
    </ul>
  </section>
);
