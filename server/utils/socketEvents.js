import volumeCounter from '../helpers/volumeCounter';
import {getFingerPrint} from '../controllers/userFingerprints';

const socketEvents = app => {
    const {ws, eventEmitter} = app.locals;
    ws.on('connection', socket => {
        const emitSolenoidOpen = (payload = {}) => {
            const {fingerId} = payload;
            getFingerPrint(app, {id: fingerId}).then(user => {
                socket.send(JSON.stringify({
                    event: 'solenoid:open',
                    data: {user}
                }));
            });
        };

        const emitSolenoidClose = () => {
            socket.send(JSON.stringify({event: 'solenoid:close'}));
        };

        const emitBeerPour = payload => {
            const {kegPosId: beerTapPosition, pulses} = payload;
            socket.send(JSON.stringify({
                event: 'beer:pour',
                data: {
                    beerTapPosition,
                    beerPoured: volumeCounter(pulses)
                }
            }));
        };

        eventEmitter.on('solenoid:open', emitSolenoidOpen);
        eventEmitter.on('solenoid:close', emitSolenoidClose);
        eventEmitter.on('beer:pour', emitBeerPour);

        socket.on('close', () => {
            eventEmitter.removeListener('solenoid:open', emitSolenoidOpen);
            eventEmitter.removeListener('solenoid:close', emitSolenoidClose);
            eventEmitter.removeListener('beer:pour', emitBeerPour);
        });
    });
};

export default socketEvents;
