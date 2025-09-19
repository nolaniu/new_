import Layout from '../components/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const breadcrumbItemsSource =
    (typeof Component.getBreadcrumbItems === 'function' && Component.getBreadcrumbItems(pageProps)) ||
    Component.breadcrumbItems ||
    pageProps.breadcrumbItems ||
    [];

  const breadcrumbItems = Array.isArray(breadcrumbItemsSource) ? breadcrumbItemsSource : [];

  const page = <Component {...pageProps} />;

  if (Component.getLayout) {
    return Component.getLayout(page, breadcrumbItems);
  }

  return <Layout breadcrumbItems={breadcrumbItems}>{page}</Layout>;
}

export default MyApp;
