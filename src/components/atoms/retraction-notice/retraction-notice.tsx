import { type JSX } from 'react';
import './retraction-notice.scss';

export const RetractionNotice = ({ url }:{ url: string }): JSX.Element => (
  <div className="retraction-notice">
    <p>This article is retracted.</p>
    <p><a href={url}>Read the retraction notice</a>.</p>
  </div>
);
