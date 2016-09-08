import volumeCounter from './volumeCounter';
import {getFingerPrint} from '../controllers/fingerprint';

let user = null;
let kegPosId = null;
let beerPoured = 0;

export default app => {
    const {arduino, eventEmitter, ws} = app.locals;

    eventEmitter.on('finger:found', payload => {
        const {id} = payload;

        getFingerPrint(app, {id})
            .then(response => {
                const sendData = `solenoid:open,fingerId:${id}\n`;
                user = response;
                arduino.write(sendData);
            });
    });

    eventEmitter.on('solenoid:open', (payload = {}) => {
        kegPosId = payload.kegPosId;
        beerPoured = 0;
    });

    eventEmitter.on('beer:pour', payload => {
        beerPoured = volumeCounter(payload.pulses);
        console.log(`${beerPoured}ml of beer poured`);
    });

    eventEmitter.on('solenoid:close', () => {
        console.log(`save beerPoured ${beerPoured}ml to user id ${user.userId}`);
        user = null;
        kegPosId = null;
        beerPoured = 0;
    });

    ws.on('connection', socket => {
        console.log('socket connected');

        const emitSolenoidOpen = function () {
            console.log(emitSolenoidOpen, user);
            socket.send(JSON.stringify({
                event: 'solenoid:open',
                data: {user}
            }));
        };

        const emitSolenoidClose = function () {
            socket.send(JSON.stringify({
                event: 'solenoid:close',
                data: {user}
            }));
        };

        const emitBeerPour = function () {
            socket.send(JSON.stringify({
                event: 'beer:pour',
                data: {kegPosId, beerPoured}
            }));
        };

        eventEmitter.on('solenoid:open', emitSolenoidOpen);
        eventEmitter.on('beer:pour', emitBeerPour);

        socket.on('close', () => {
            console.log('socket disconnected');
            eventEmitter.removeListener('solenoid:open', emitSolenoidOpen);
            eventEmitter.removeListener('solenoid:close', emitSolenoidClose);
            eventEmitter.removeListener('beer:pour', emitBeerPour);
        });
    });

};
