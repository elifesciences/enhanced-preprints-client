import { ListContent } from '../../../types/content';
import { contentToJsx, Options } from '../../../utils/content-to-jsx';
import './list.scss';

export const List = ({ content, options }: { content: ListContent, options?: Options }) => {
  const className = content.meta ? `list-${content.meta.listType}` : '';
  return content.order === 'Ascending' ?
    <ol className={className}>{ contentToJsx(content.items, options) }</ol> :
    <ul className={className}>{ contentToJsx(content.items, options) }</ul>;
};
