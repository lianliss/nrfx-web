const path = require('path');

module.exports = {
  title: "Narfex UI",
  components: 'src/ui/components/**/[A-Z]*.js',
  require: [
    path.join(__dirname, './StyleGuide.js'),
    path.join(__dirname, './src/index.less'),
    path.join(__dirname, './src/index/polyfill.js'),
  ],
  webpackConfig: require('./config/webpack.config'),
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
}
