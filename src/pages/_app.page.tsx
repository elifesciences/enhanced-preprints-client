
import { DefaultLayout } from '../components/layouts/default';

export default function MyApp({ Component, pageProps }: any) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}
