import './version-history.scss';

type Props = {
  versions: {
    label: string,
    date: Date,
    link?: {
      url: string,
      label: string,
    },
  }[]
};

export const VersionHistory = ({ versions }: Props) => (
  <section className="version-history">
    <h3>Versions</h3>
    <ul>
      <li>
        <span>Preprint posted: </span>
        <a href="https://doi.org/10.1101/2022.11.08.515698"><time>November 22, 2022</time> (view preprint)</a>
      </li>
      <li>
        <span>Sent for peer review: </span>
        <time>November 28, 2022</time>
      </li>
      <li>
        <span>Preprint posted: </span>
        <a href="https://doi.org/10.7554/eLife.85111.1"><time>January 25, 2023</time> (view preprint)</a>
      </li>
      <li>
        <span>Preprint posted: </span>
        <a href="https://doi.org/10.7554/eLife.85111.2"><time>May 10, 2023</time> (view preprint)</a>
      </li>
      <li>
        <span>Version of Record published: </span>
        <a href="https://elifesciences.org/articles/85111"><time>June 7, 2023</time> (version 1)?</a>
      </li>
    </ul>
  </section>
);
