import volumeCounter from '../helpers/volumeCounter';
import {getFingerPrint} from '../controllers/userFingerprints';
import {getBeerTaps} from '../controllers/beerTaps';

let cacheBeerTaps = {};

export default app => {
    const {arduino, eventEmitter} = app.locals;

    eventEmitter.on('finger:found', payload => {
        const {id} = payload;

        getFingerPrint(app, {id})
            .then(response => {
                const sendData = JSON.stringify({
                    event: 'solenoid',
                    data: {
                        open: true,
                        fingerId: response.id
                    }
                });
                arduino.write(sendData + '\n');
            })
            .catch(error => {
                console.error(error);
            });
    });

    eventEmitter.on('solenoid:open', () => {
        cacheBeerTaps = {};
    });

    eventEmitter.on('beer:pour', payload => {
        const {kegPosId: beerTapPosition, pulses} = payload;
        cacheBeerTaps[beerTapPosition] = volumeCounter(pulses);

        console.log(`${cacheBeerTaps[beerTapPosition]}ml of beer poured, from tap ${beerTapPosition}`);
    });

    eventEmitter.on('solenoid:close', payload => {
        const {fingerId} = payload;

        if (Object.keys(cacheBeerTaps).length) {
            getFingerPrint(app, {id: fingerId})
                .then(user => {
                    const filter = {
                        position: Object.keys(cacheBeerTaps),
                        active: 1
                    };

                    return getBeerTaps(app, {filter})
                        .then(beerTaps => {
                            return {user, beerTaps};
                        });
                })
                .then(({user, beerTaps}) => {
                    beerTaps.forEach(beerTap => {
                        console.log(`
                            save ${cacheBeerTaps[beerTap.position]}ml of beer poured
                            from tap #${beerTap.id}
                            by user #${user.userId} ${user.displayName}
                        `);
                    });
                    cacheBeerTaps = {};
                })
                .catch(error => {
                    console.error(error);
                });
        }
    });
};
