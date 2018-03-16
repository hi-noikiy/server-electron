
const config = {
    appenders: {
        out: { type: 'console' },
        result: { type: 'dateFile', filename: 'logs/result', "pattern": "-dd.log", alwaysIncludePattern: true },
        error: { type: 'dateFile', filename: 'logs/error', "pattern": "-dd.log", alwaysIncludePattern: true },
        default: { type: 'dateFile', filename: 'logs/default', "pattern": "-dd.log", alwaysIncludePattern: true }
    },
    categories: {
        default: { appenders: ['out', 'default'], level: 'info' },
        result: { appenders: ['result'], level: 'info' },
        error: { appenders: ['error'], level: 'error' }
    }
}
module.exports = config;