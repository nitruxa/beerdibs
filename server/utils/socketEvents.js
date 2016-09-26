import {
    EVENT_FINGER_FOUND,
    EVENT_BEER_POUR,
    EVENT_SOLENOID_CLOSE,

    FINGER_SCANNER_ACTIVATED,
    FINGER_SAVED
} from './arduinoListener';

const addListener = function (eventEmitter) {
    return (event, callback) => {
        eventEmitter.on(event, callback);
    };
};

const removeListener = function (eventEmitter) {
    return (event, callback) => {
        eventEmitter.removeListener(event, callback);
    };
};

const emitEvent = function (socket) {
    return eventName => {
        return data => {
            socket.send(JSON.stringify({
                event: eventName,
                data
            }));
        };
    };
};

const emitFingerFound = function (socket) {
    return fingerPrint => {
        socket.send(JSON.stringify({
            event: EVENT_FINGER_FOUND,
            data: {fingerPrint}
        }));
    };
};

const emitSolenoidClose = function (socket) {
    return () => {
        socket.send(JSON.stringify({event: 'solenoid:close'}));
    };
};

const emitBeerPour = function (socket) {
    return ({beerTapPosition, beerPoured}) => {
        socket.send(JSON.stringify({
            event: 'beer:pour',
            data: {
                beerTapPosition,
                beerPoured
            }
        }));
    };
};

const socketEvents = app => {
    const {ws, eventEmitter} = app.locals;
    ws.on('connection', socket => {
        const events = [
            {
                event: `socket:${EVENT_FINGER_FOUND}`,
                callback: emitFingerFound(socket)
            },
            {
                event: `socket:${EVENT_SOLENOID_CLOSE}`,
                callback: emitSolenoidClose(socket)
            },
            {
                event: `socket:${EVENT_BEER_POUR}`,
                callback: emitBeerPour(socket)
            },
            {
                event: `socket:${FINGER_SCANNER_ACTIVATED}`,
                callback: emitEvent(socket)(FINGER_SCANNER_ACTIVATED)
            },
            {
                event: `socket:${FINGER_SAVED}`,
                callback: emitEvent(socket)(FINGER_SAVED)
            }
        ];

        events.forEach(event => {
            addListener(eventEmitter)(event.event, event.callback);
        });

        socket.on('close', () => {
            events.forEach(event => {
                removeListener(eventEmitter)(event.event, event.callback);
            });
        });
    });
};

export default socketEvents;
