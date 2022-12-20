import './clipboard.scss';

const supportsClipboardAPI = () => (navigator.clipboard);

export const Clipboard = (): JSX.Element => {

  return (
    <div className="clipboard-container">
      <div className="form-item">
          <input type="url" className="text-field text-field--url" value="https://doi.org/10.7554/eLife.09560" />

          {(supportsClipboardAPI() ? <button className="button button--default" onClick={() => {navigator.clipboard.writeText('https://doi.org/10.7554/eLife.09560')}}>copy to clipboard</button> : <></>)}
      </div>
    </div>
  );
};
