// next-i18next.config.js
module.exports = {
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
    localeDetection: true,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
