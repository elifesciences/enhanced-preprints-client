import { formatDate } from '../../../utils/formatters';
import './version-history.scss';
import { type VersionHistoryItem } from '../../../types';

type Props = {
  versions: VersionHistoryItem[]
};

export const VersionHistory = ({ versions }: Props) => (
  <div id="version-history" className="version-history">
    <h2>Version history</h2>
    <ul>
      {versions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(({ label, date, url }, index) => (
        <li key={index}>
          { url ? (<a href={url}>{label}</a>) : label}: <time dateTime={new Date(date).toISOString()}>{formatDate(new Date(date))}</time>
        </li>
      ))}
    </ul>
  </div>
);
