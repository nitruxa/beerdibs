import {Server as WebsocketServer} from 'ws';
import getLogger from 'dibs-node-log';
import EventEmitter from 'events';
import config from '../../config';
import configureDb from './configureDb';
import arduinoConnect from '../utils/arduinoConnect';

export default (app, settings) => {
    const eventEmitter = new EventEmitter();
    const conf = Object.assign({}, config, settings);
    const db = configureDb();
    const ws = new WebsocketServer({server: conf.socketServer});
    const logger = getLogger({
        isLocal: config.devbox
    });

    Object.assign(app.locals, conf);

    Object.defineProperty(app.locals, 'logger', { value: logger });
    Object.defineProperty(app.locals, 'db', { value: db });
    Object.defineProperty(app.locals, 'eventEmitter', { value: eventEmitter });
    Object.defineProperty(app.locals, 'ws', { value: ws });

    const arduino = arduinoConnect(app);
    Object.defineProperty(app.locals, 'arduino', { value: arduino });

    return app;
};
