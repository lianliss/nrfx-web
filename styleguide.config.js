const path = require('path');

module.exports = {
  title: "Narfex UI",
  components: 'src/ui/components/**/[A-Z]*.js',
  require: [
    path.join(__dirname, './StyleGuide.js'),
    path.join(__dirname, './src/index.less'),
  ],
  webpackConfig: require('./config/webpack.config'),
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  styleguideComponents: {
    Wrapper: path.join(__dirname, './src/StyleGuideWrapper.js'),
  },
}
