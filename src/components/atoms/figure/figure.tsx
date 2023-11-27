import { useRef, useState, useEffect } from 'react';
import './figure.scss';

export const Figure = ({ id, content, caption,  label}: { content: React.ReactNode, id?: string, caption?: React.ReactNode, label?: string }) => {
  const captionRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const checkOverflow = () => {
    if (captionRef.current) {
      const isOverflowing =
        captionRef.current.scrollHeight > captionRef.current.offsetHeight;

      setShowButton(isOverflowing || (expanded && captionRef.current.offsetHeight >= captionRef.current.scrollHeight));
      setExpanded(false);
    }
  };

  useEffect(() => {
    checkOverflow();

    const handleResize = () => {
      checkOverflow();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [captionRef.current?.offsetHeight]);

  return (
    <div className="figure-container">
      <figure className="figure" {...(id && { id: id })}>
        {label && <label className="figure__label">{label}</label>}
        {content}
        {caption && <figcaption ref={captionRef} className={`figure__caption${expanded ? ' figure__caption--expanded' : ''}`}>{caption}</figcaption>}
      </figure>
      {showButton && (<button className={`figure__caption__button${expanded ? ' expanded' : ''}`} onClick={() => { setExpanded(!expanded); }}>{expanded ? 'Show less' : 'Show more'}</button>)}
    </div>
  );
};
