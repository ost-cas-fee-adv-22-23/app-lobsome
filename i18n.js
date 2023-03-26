import hoistNonReactStatics from 'hoist-non-react-statics';

module.exports = {
  locales: ['en'],
  defaultLocale: 'en',
  pages: {
    '*': ['common'],
  },
  staticsHoc: hoistNonReactStatics,
};
