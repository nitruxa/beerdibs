import {app, socketServer} from './app.js';

const {port, socketPort} = app.locals;
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

    socketServer.on('request', app);
    socketServer.listen(socketPort, () => {
        logger.info('socket server started');
    });
});


export default server;
