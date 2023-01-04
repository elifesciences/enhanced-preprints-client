import { useEffect, useState } from 'react';
import '../button/button.scss';
import './clipboard.scss';

type ClipboardProps = {
  text: string,
};

const supportsClipboardAPI = () => (!!navigator.clipboard);

export const Clipboard = ({ text }: ClipboardProps): JSX.Element => {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => setShowButton(supportsClipboardAPI()), []);

  return (
    <div className="clipboard-container">
      <div className="form-item">
          <input type="input" className="text-field" value={text} />

          {(showButton ? <button className={`button button--default button-clipboard${copied ? ' copied' : ''}`} onClick={() => { setCopied(true); navigator.clipboard.writeText(text); }}>{copied ? 'copied' : 'copy to clipboard'}</button> : <></>)}
      </div>
    </div>
  );
};
