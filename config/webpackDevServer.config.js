

const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const paths = require('./paths');
const fs = require('fs');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || 'localhost';
// const isAdmin = process.env.DOMAIN === 'admin';

module.exports = (proxy, allowedHost) => ({
  //allowedHosts: [allowedHost],
  client: {
    logging: 'verbose', // 'log' | 'info' | 'warn' | 'error' | 'none' | 'verbose'
    overlay: false, // Shows a full-screen overlay in the browser when there are compiler errors or warnings.
    progress: false, // Prints compilation progress in percentage in the browser.
    reconnect: true, // Tells dev-server the number of times it should try to reconnect the client.
    //webSocketTransport: 'ws',
    //webSocketURL: 'ws://0.0.0.0:8080/ws',
  },
  //webSocketServer: 'ws',
  http2: false,
  https: protocol === 'https',
  //headers: [],
  historyApiFallback: true,
  host,
  hot: true,
  liveReload: true,
  magicHtml: false,
  //onAfterSetupMiddleware: devServer => {},
  //onBeforeSetupMiddleware: devServer => {},
  //onListening: devServer = {},
  open: false, // Open browser on start.
  port: 'auto',
  proxy,
  //server: 'http',
  setupExitSignals: true, // SIGINT and SIGTERM on close
  static: [],
});