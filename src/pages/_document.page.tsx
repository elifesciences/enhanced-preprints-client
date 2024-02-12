import {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { config } from '../config';

export default function Document() {
  return (
    <Html lang="en-US">
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <style>{`
          body {
            background-color: #fff;
            margin: 0;
          }
          [id] {
            scroll-margin: 108px;
          }
          `}
        </style>
      </Head>
      <body {...(config.siteName && { className: `site-${config.siteName}` })}>
        { config.gtmId &&
          <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${config.gtmId}`}
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        }
        <Main/>
        <NextScript/>
      </body>
    </Html>
  );
}
