import ReactDOMServer from 'react-dom/server';
import { type Content } from './content';
import { contentToJsx } from './content-to-jsx';

export const contentToHtml = (content: Content): string => {
  const jsx = <>
    {contentToJsx(content)}
  </>;

  return ReactDOMServer.renderToStaticMarkup(jsx);
};
