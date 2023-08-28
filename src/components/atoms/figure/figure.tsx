import { useRef, useState, useEffect } from 'react';
import { contentToJsx } from '../../../utils/content-to-jsx';
import './figure.scss';
import { FigureContent } from '../../../types';

export const Figure = ({ content }: { content: FigureContent }) => {
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
      <figure className="figure" {...(content.id && { id: content.id })}>
        {content.label && <label className="figure__label">{content.label}</label>}
        {contentToJsx(content.content)}
        {content.caption && <figcaption ref={captionRef} className={`figure__caption${expanded ? ' figure__caption--expanded' : ''}`}>{contentToJsx(content.caption, undefined, 4)}</figcaption>}
      </figure>
      {showButton && (<button className={`figure__caption__button${expanded ? ' expanded' : ''}`} onClick={() => { setExpanded(!expanded); }}>{expanded ? 'Show less' : 'Show more'}</button>)}
    </div>
  );
};
