import app from './app.js';

const port = app.locals.port;
const pkg = require('../package');

const server = app.listen(port, function () {
    const logger = app.locals.logger;
    const address = server.address().address;
    const report = {
        "application": `${pkg.name}@${pkg.version}`,
        "listening on": `${address}:${port}`,
        "NODE_ENV": app.get('env'),
        node: process.version
    };

    logger.info('started', JSON.stringify(report, null, 2));
});

export default server;
