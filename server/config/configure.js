import getLogger from 'dibs-node-log';
import config from '../../config';
import configureDb from './configureDb';

export default (app, settings) => {
    const conf = Object.assign({}, config, settings);
    const db = configureDb();
    const logger = getLogger({
        isLocal: config.devbox
    });

    Object.assign(app.locals, conf);

    Object.defineProperty(app.locals, 'logger', { value: logger });
    Object.defineProperty(app.locals, 'db', { value: db });

    return app;
};
