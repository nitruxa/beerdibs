import {
    EVENT_FINGER_FOUND,
    EVENT_BEER_POUR,
    EVENT_SOLENOID_CLOSE
} from './arduinoListener';

const socketEvents = app => {
    const {ws, eventEmitter} = app.locals;
    ws.on('connection', socket => {
        const emitFingerFound = fingerPrint => {
            socket.send(JSON.stringify({
                event: EVENT_FINGER_FOUND,
                data: {fingerPrint}
            }));
        };

        const emitSolenoidClose = () => {
            socket.send(JSON.stringify({event: 'solenoid:close'}));
        };

        const emitBeerPour = ({beerTapPosition, beerPoured}) => {
            socket.send(JSON.stringify({
                event: 'beer:pour',
                data: {
                    beerTapPosition,
                    beerPoured
                }
            }));
        };

        eventEmitter.on(`socket:${EVENT_FINGER_FOUND}`, emitFingerFound);
        eventEmitter.on(`socket:${EVENT_SOLENOID_CLOSE}`, emitSolenoidClose);
        eventEmitter.on(`socket:${EVENT_BEER_POUR}`, emitBeerPour);

        socket.on('close', () => {
            eventEmitter.removeListener(`socket:${EVENT_FINGER_FOUND}`, emitFingerFound);
            eventEmitter.removeListener(`socket:${EVENT_SOLENOID_CLOSE}`, emitSolenoidClose);
            eventEmitter.removeListener(`socket:${EVENT_BEER_POUR}`, emitBeerPour);
        });
    });
};

export default socketEvents;
