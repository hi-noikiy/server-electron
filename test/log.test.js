const log4js = require('log4js');
log4js.configure({
    appenders: {
        cheese: { type: 'file', filename: 'cheese.log' },
        https: { type: 'file', filename: 'https.log' }
    },
    categories: {
        default: { appenders: ['cheese'], level: 'trace' },
        http: { appenders: ['https'], level: 'trace' }
    }
});

const logger = log4js.getLogger('https');
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');