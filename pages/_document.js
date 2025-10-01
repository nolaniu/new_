import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#8b5cf6" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9562574307655830"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body className="bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
