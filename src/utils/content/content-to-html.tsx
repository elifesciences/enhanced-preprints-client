import ReactDOMServer from 'react-dom/server';
import { contentToJsx } from './content-to-jsx';
import { type Content } from '../../types';

export const contentToHtml = (content: Content): string => {
  const jsx = <>
    {contentToJsx(content)}
  </>;

  return ReactDOMServer.renderToStaticMarkup(jsx);
};
