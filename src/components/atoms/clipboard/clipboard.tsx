import { useEffect, useState } from 'react';
import '../button/button.scss';
import './clipboard.scss';

type ClipboardProps = {
  text: string,
  buttonText?: string,
};

const supportsClipboardAPI = () => (!!navigator.clipboard);

export const Clipboard = ({ text, buttonText = 'Copy to clipboard' }: ClipboardProps) => {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => setShowButton(supportsClipboardAPI()), []);

  const onClick = () => {
    setCopied(true);
    navigator.clipboard.writeText(text);
  };

  return showButton ? (
    <button className={`button button--clipboard${copied ? ' copied' : ''}`} onClick={onClick}>{copied ? 'Copied' : buttonText}</button>
  ) : <></>;
};
