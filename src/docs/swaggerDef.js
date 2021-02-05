const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Octano PPT Documentación',
    version,
  },
};

module.exports = swaggerDef;
