import './cite-all-versions.scss';

type Props = {
  doi: string
};

export const CiteAllVersions = ({ doi }: Props) => (
  <>
    <div id="cite-all-versions" className="cite-all-versions">
      <h2>Cite all versions</h2>
      <p>You can cite all versions using the DOI <a href={`https://doi.org/${doi}`}>https://doi.org/{doi}</a>. This DOI represents all versions, and will always resolve to the latest one.</p>
    </div>
  </>
);
