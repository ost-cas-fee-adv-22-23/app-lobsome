// eslint-disable-next-line @typescript-eslint/no-var-requires
const hoistNonReactStatics = require('hoist-non-react-statics');

module.exports = {
  locales: ['en'],
  defaultLocale: 'en',
  pages: {
    '*': ['common'],
    '/login': ['login'],
    '/': ['index'],
    '/search-tag/[term]': ['search-tag'],
  },
  staticsHoc: hoistNonReactStatics,
};
