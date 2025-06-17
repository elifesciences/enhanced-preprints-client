import './retraction-notice.scss';

export const RetractionNotice = ({ url }:{ url: string }) => <div className="retraction-notice">
  <p>This article has been retracted.</p>
  <p><a href={url}>Read the retraction notice</a>.</p>
</div>;
