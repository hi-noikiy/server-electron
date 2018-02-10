const _ = require('lodash');
let configs_default = require('./config.default');
let configs_prod = require('./config.prod');
if (process.env.NODE_ENV === 'production') {
  configs_default = _.assign(configs_default, configs_prod);
}
module.exports = configs_default;

