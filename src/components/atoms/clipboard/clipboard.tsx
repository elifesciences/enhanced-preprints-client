import { useEffect, useState } from 'react';
import './clipboard.scss';

const supportsClipboardAPI = () => (navigator.clipboard ? true : false);

export const Clipboard = (): JSX.Element => {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => setShowButton(supportsClipboardAPI()), []);

  return (
    <div className="clipboard-container">
      <div className="form-item">
          <input type="url" className="text-field text-field--url" value="https://doi.org/10.7554/eLife.09560" />

          {(showButton ? <button className={`button button--default${copied ? ' copied' : ''}`} onClick={() => {setCopied(true); navigator.clipboard.writeText('https://doi.org/10.7554/eLife.09560');}}>copy to clipboard</button> : <></>)}
      </div>
    </div>
  );
};
