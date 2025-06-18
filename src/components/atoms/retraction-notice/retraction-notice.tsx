import './retraction-notice.scss';

export const RetractionNotice = ({ url }:{ url: string }) => (
  <div className="retraction-notice">
    <p>This article is retracted.</p>
    <p><a href={url}>Read the retraction notice</a>.</p>
  </div>
);
