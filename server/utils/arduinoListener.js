import volumeCounter from '../helpers/volumeCounter';
import {getFingerprint} from '../controllers/userFingerprints';
import {getBeerTaps} from '../controllers/beerTaps';
import {addUserBeer} from '../controllers/userBeers';

import * as slackBot from './slackBot';

let cacheFingerPrint = null;
let cacheBeerTaps = {};
let closeSolenoidTimeout;

export const EVENT_FINGER_FOUND = 'finger:found';
export const EVENT_BEER_POUR = 'beer:pour';
export const EVENT_SOLENOID_OPEN = 'solenoid:open';
export const EVENT_SOLENOID_CLOSE = 'solenoid:close';

const getFingerprintCache = (app, payload) => {
    const {id} = payload;

    if (id < 1) {
        return Promise.reject();
    }

    if (cacheFingerPrint) {
        return cacheFingerPrint;
    }

    cacheFingerPrint = getFingerprint(app, payload).then(fingerprints => fingerprints[0]);

    return cacheFingerPrint;
};

const setSolenoidCloseTimeout = eventEmitter => {
    clearTimeout(closeSolenoidTimeout);
    closeSolenoidTimeout = setTimeout(() => eventEmitter.emit(EVENT_SOLENOID_CLOSE, {}), 15000);
};

export const arduinoListener = app => {
    const {arduino, eventEmitter} = app.locals;

    eventEmitter.on(EVENT_FINGER_FOUND, payload => {
        const {id} = payload;

        cacheFingerPrint = null;
        cacheBeerTaps = {};

        getFingerprintCache(app, {id})
            .then(fingerPrint => {
                arduino.sendData({
                    event: 'solenoid',
                    data: {
                        open: true,
                        fingerId: fingerPrint.id
                    }
                });

                eventEmitter.emit(`socket:${EVENT_FINGER_FOUND}`, fingerPrint);
                slackBot.fingerFound(fingerPrint);
                setSolenoidCloseTimeout(eventEmitter);
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

        getFingerprintCache(app, {id: fingerId}).then(() => {
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
            getFingerprintCache(app, {id: fingerId})
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

                    beerTaps = beerTaps.map(beerTap => {
                        const volume = beerTapsCopy[beerTap.position];
                        beerTap.volumePoured = volume;

                        promises.push(
                            addUserBeer(app, {
                                id: user.userId,
                                beerKegId: beerTap.beerKeg.id,
                                volume
                            }).then(() => {
                                console.log(`@@ --- Saved +| ${volume} ml from tap ${beerTap.position} to ${user.displayName}`);
                            })
                        );

                        return beerTap;
                    });

                    return Promise.all(promises).then(() => {
                        return {user, beerTaps};
                    });
                })
                .catch(error => {
                    console.error(error);
                })
                .then(({user, beerTaps} = {}) => {
                    cacheFingerPrint = null;
                    eventEmitter.emit(`socket:${EVENT_SOLENOID_CLOSE}`, {user, beerTaps});
                    slackBot.beerPoured({user, beerTaps});
                });
        } else {
            eventEmitter.emit(`socket:${EVENT_SOLENOID_CLOSE}`);
            cacheFingerPrint = null;
        }
    });
};
