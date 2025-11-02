import { type ListContent } from '../../../types/content';
import { contentToJsx, type Options } from '../../../utils/content';
import './list.scss';

export const List = ({ content, options }: { content: ListContent, options?: Options }) => {
  const className = content.meta ? `list-${content.meta.listType}` : '';
  return content.order === 'Ascending' ?
    <ol className={className}>{ contentToJsx(content.items, options) }</ol> :
    <ul className={className}>{ contentToJsx(content.items, options) }</ul>;
};
