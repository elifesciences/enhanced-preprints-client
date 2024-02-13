import { ListContent } from '../../../types/content';
import { contentToJsx, Options } from '../../../utils/content-to-jsx';

export const List = ({ content, options }: { content: ListContent, options?: Options }) => (content.order === 'Ascending' ? <ol>{ contentToJsx(content.items, options) }</ol> : <ul>{ contentToJsx(content.items, options) }</ul>);
