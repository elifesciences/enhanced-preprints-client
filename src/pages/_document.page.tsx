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
          html {
            scroll-behavior: smooth;
          }
          body {
            background-color: #fff;
          }
          [id] {
            scroll-margin: 74px;
          }
          `}
        </style>
        { config.cookiebotId &&
          <script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid={config.cookiebotId}></script>
        }
        { config.gtmId &&
          <script dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${config.gtmId}');`,
          }}></script>
        }
        <title>Enhanced Preprints Platform</title>
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
