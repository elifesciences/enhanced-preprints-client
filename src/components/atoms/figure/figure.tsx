import {useMemo, useRef, useState} from 'react';
import { contentToJsx } from '../../../utils/content-to-jsx';
import './figure.scss';
import { FigureContent } from '../../../types';

export const Figure = ({ content }: { content: FigureContent }) => {
  const captionRef = useRef<HTMLElement>(null);
  const expansionMemo = useMemo(() => captionRef.current && captionRef.current.offsetHeight < captionRef.current.scrollHeight, [captionRef.current?.scrollHeight]);
  const [expanded, setExpanded] = useState(expansionMemo ?? false);
  return (
    <figure className="figure" id={content.id}>, setExpanded
      <label className="figure__label">{content.label}</label>
      {contentToJsx(content.content)}
      <figcaption ref={captionRef} className={`figure__caption${expanded && ' prototype'}`}>{contentToJsx(content.caption)}</figcaption>
    </figure>
  );
};
