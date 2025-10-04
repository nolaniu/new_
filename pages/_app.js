import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import '../styles/globals.css';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

const DEFAULT_META = {
  title: 'Do Studyhub - Focus & mindful study tools',
  description:
    'Do Studyhub turns a to-do list into a focus hub with dark room, custom Pomodoro, white-noise mixer, priorities, and a 4-4-6 breathing coach, no logins.',
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const breadcrumbItemsSource =
    (typeof Component.getBreadcrumbItems === 'function' && Component.getBreadcrumbItems(pageProps)) ||
    Component.breadcrumbItems ||
    pageProps.breadcrumbItems ||
    [];

  const breadcrumbItems = Array.isArray(breadcrumbItemsSource) ? breadcrumbItemsSource : [];

  const metaSource =
    (typeof Component.getMeta === 'function' && Component.getMeta(pageProps)) ||
    Component.meta ||
    pageProps.meta ||
    {};

  const meta = { ...DEFAULT_META, ...metaSource };

  const canonicalPath = ((router.asPath || '/').split('#')[0] || '/').split('?')[0] || '/';
  const canonical = `https://dostudy.me${canonicalPath}`;

  const page = <Component {...pageProps} />;

  let renderedPage = page;
  if (Component.getLayout) {
    renderedPage = Component.getLayout(page, breadcrumbItems, meta);
  } else {
    renderedPage = (
      <Layout breadcrumbItems={breadcrumbItems} meta={meta}>
        {page}
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content="darkroom, meditation, study, whitenoise, todolist" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
      </Head>
      {renderedPage}
    </>
  );
}

export default MyApp;
