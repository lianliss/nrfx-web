const path = require('path');

module.exports = {
  title: "BitcoinBot UI",
  components: 'src/ui/components/**/[A-Z]*.js',
  require: [
    path.join(__dirname, './src/index.less'),
    path.join(__dirname, './src/polyfill.js'),
  ],
  webpackConfig: require('./config/webpack.config'),
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
}