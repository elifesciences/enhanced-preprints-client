import './clipboard.scss';

export const Clipboard = (): JSX.Element => (
  <div className="clipboard-container">
    <div className="form-item">
        <input type="url" className="text-field text-field--url" value="https://doi.org/10.7554/eLife.09560" />
        <button className="button button--default">copy to clipboard</button>
    </div>
  </div>
);
