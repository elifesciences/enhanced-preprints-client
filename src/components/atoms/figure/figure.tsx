import { useMemo, useRef, useState } from 'react';
import { contentToJsx } from '../../../utils/content-to-jsx';
import './figure.scss';
import { FigureContent } from '../../../types';

export const Figure = ({ content }: { content: FigureContent }) => {
  const captionRef = useRef<HTMLElement>(null);
  const expansionMemo = useMemo(() => captionRef.current && captionRef.current.offsetHeight < captionRef.current.scrollHeight, [captionRef.current?.scrollHeight]);
  const [expanded, setExpanded] = useState(expansionMemo ?? false);
  return (
    <div>
      <figure className="figure" id={content.id}>
        <label className="figure__label">{content.label}</label>
        {contentToJsx(content.content)}
        <figcaption ref={captionRef} className={`figure__caption${expanded ? '--expanded' : ''}`}>{contentToJsx(content.caption)}</figcaption>
      </figure>
      <button className={`figure__caption__button ${expanded ? 'expanded' : ''}`} onClick={() => { setExpanded(!expanded); }}>{expanded ? 'Show less' : 'Show more'}</button>
    </div>
  );
};
