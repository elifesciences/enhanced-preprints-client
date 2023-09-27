import {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { config } from '../config';

export default function Document() {
  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,600;1,400;1,600&family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
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
      <body>
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
