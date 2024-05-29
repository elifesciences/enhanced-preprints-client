import './previous-version-warning.scss';

export const PreviousVersionWarning = ({ url }: { url: string }) => (
  <div className="previous-version-warning-container">
    <div className="previous-version-warning">
      <span className="previous-version-warning__text">A newer version is available.</span>
      <span className="previous-version-warning__text">
        <a className="previous-version-warning__link" href={encodeURI(url)}>Read the latest version</a>.
      </span>
    </div>
  </div>
);
