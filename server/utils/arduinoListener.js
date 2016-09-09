import volumeCounter from '../helpers/volumeCounter';
import {getFingerPrint} from '../controllers/userFingerprints';
import {getBeerTaps} from '../controllers/beerTaps';
import {addUserBeer} from '../controllers/userBeers';

let cacheFingerPrint = null;
let cacheBeerTaps = {};
let closeSolenoidTimeout;

export const EVENT_FINGER_FOUND = 'finger:found';
export const EVENT_BEER_POUR = 'beer:pour';
export const EVENT_SOLENOID_OPEN = 'solenoid:open';
export const EVENT_SOLENOID_CLOSE = 'solenoid:close';

const getFingerPrintCache = (app, payload) => {
    const {id} = payload;

    if (id < 1) {
        return Promise.reject();
    }

    if (cacheFingerPrint) {
        return cacheFingerPrint;
    }

    cacheFingerPrint = getFingerPrint(app, payload);

    return cacheFingerPrint;
};

const setSolenoidCloseTimeout = eventEmitter => {
    closeSolenoidTimeout = setTimeout(() => eventEmitter.emit(EVENT_SOLENOID_CLOSE, null), 15000);
};

export const arduinoListener = app => {
    const {arduino, eventEmitter} = app.locals;

    eventEmitter.on(EVENT_FINGER_FOUND, payload => {
        const {id} = payload;

        cacheBeerTaps = {};

        getFingerPrintCache(app, {id})
            .then(fingerPrint => {
                const sendData = JSON.stringify({
                    event: 'solenoid',
                    data: {
                        open: true,
                        fingerId: fingerPrint.id
                    }
                });

                console.log('>> --- Sending to arduino +| ', sendData);
                arduino.write(sendData + '\n');

                eventEmitter.emit(`socket:${EVENT_FINGER_FOUND}`, fingerPrint);
            })
            .catch(error => {
                console.error(error);
            });
    });

    eventEmitter.on(EVENT_BEER_POUR, payload => {
        const {kegPosId: beerTapPosition, pulses, fingerId} = payload;
        const beerPoured = volumeCounter(pulses);

        if (beerPoured < 20) {
            return;
        }

        getFingerPrintCache(app, {id: fingerId}).then(() => {
            clearTimeout(closeSolenoidTimeout);
            setSolenoidCloseTimeout(eventEmitter);

            cacheBeerTaps[beerTapPosition] = beerPoured;

            eventEmitter.emit(`socket:${EVENT_BEER_POUR}`, {
                beerTapPosition,
                beerPoured
            });
        });

    });

    eventEmitter.on(EVENT_SOLENOID_OPEN, () => {
        cacheBeerTaps = {};
        setSolenoidCloseTimeout(eventEmitter);
    });

    eventEmitter.on(EVENT_SOLENOID_CLOSE, payload => {
        const beerTapsCopy = Object.assign({}, cacheBeerTaps);
        const {fingerId} = payload;

        clearTimeout(closeSolenoidTimeout);
        cacheBeerTaps = {};

        if (Object.keys(beerTapsCopy).length) {
            getFingerPrintCache(app, {id: fingerId})
                .then(user => {
                    const filter = {
                        position: Object.keys(beerTapsCopy),
                        active: 1
                    };

                    return getBeerTaps(app, {filter})
                        .then(beerTaps => {
                            return {user, beerTaps};
                        });
                })
                .then(({user, beerTaps}) => {
                    const promises = [];

                    beerTaps.forEach(beerTap => {
                        const volume = beerTapsCopy[beerTap.position];
                        promises.push(
                            addUserBeer(app, {
                                id: user.userId,
                                beerKegId: beerTap.beerKeg.id,
                                volume
                            }).then(() => {
                                console.log(`@@ --- Saved +| ${volume} ml from tap ${beerTap.position} to ${user.displayName}`);
                            })
                        );
                    });

                    return Promise.all(promises).then(() => {
                        return {user, beerTaps: beerTapsCopy};
                    });
                })
                .catch(error => {
                    console.error(error);
                })
                .then(({user, beerTaps} = {}) => {
                    eventEmitter.emit(`socket:${EVENT_SOLENOID_CLOSE}`, {user, beerTaps});
                    cacheFingerPrint = null;
                });
        } else {
            eventEmitter.emit(`socket:${EVENT_SOLENOID_CLOSE}`);
            cacheFingerPrint = null;
        }
    });
};
