import { type JSX } from 'react';
import { contentToJsx, type ListContent, type Options } from '../../../content';
import './list.scss';

export const List = ({ content, options }: { content: ListContent, options?: Options }): JSX.Element => {
  const className = content.meta ? `list-${content.meta.listType}` : '';
  return content.order === 'Ascending' ?
    <ol className={className}>{ contentToJsx(content.items, options) }</ol> :
    <ul className={className}>{ contentToJsx(content.items, options) }</ul>;
};
