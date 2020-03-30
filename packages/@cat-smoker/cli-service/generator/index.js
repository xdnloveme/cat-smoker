module.exports = api => {
  api.extendPackage({
    scripts: {
      start: 'cat-smoker-cli-service serve',
      build: 'cat-smoker-cli-service build',
    },
    dependencies: {
      react: '^16.13.0',
      'react-dom': '^16.13.0',
    },
    browserslist: ['> 1%', 'last 2 versions'],
  });

};
