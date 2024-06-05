import { formatDate } from '../../../utils/format-date';
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
      {versions.map(({ label, date, url }, index) => (
        <li key={index}>
          { url ? (<a href={url}>{label}</a>) : label}: <time dateTime={date.toString()}>{formatDate(date)}</time>
        </li>
      ))}
    </ul>
  </section>
);
