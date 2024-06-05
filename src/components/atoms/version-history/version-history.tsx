import { formatDate } from '../../../utils/format-date';
import './version-history.scss';
import { VersionHistoryItem } from '../../../types';

type Props = {
  versions: VersionHistoryItem[]
};

export const VersionHistory = ({ versions }: Props) => (
  <section className="version-history">
    <h2>Version history</h2>
    <ul>
      {versions.sort((a, b) => a.date.getTime() - b.date.getTime()).map(({ label, date, url }, index) => (
        <li key={index}>
          { url ? (<a href={url}>{label}</a>) : label}: <time dateTime={date.toString()}>{formatDate(date)}</time>
        </li>
      ))}
    </ul>
  </section>
);
