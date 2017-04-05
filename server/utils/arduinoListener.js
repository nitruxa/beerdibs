import volumeCounter from '../helpers/volumeCounter';
import {getFingerprint, updateFingerprintStatus} from '../controllers/userFingerprints';
import {getBeerTaps} from '../controllers/beerTaps';
import {addUserBeer} from '../controllers/userBeers';

// import * as slackBot from './slackBot';

const SOLENOID_CLOSE_TIMEOUT = 15000;

let cacheFingerPrint = null;
let cacheBeerTaps = {};
let closeSolenoidTimeout;

export const EVENT_FINGER_FOUND = 'finger:found';
export const EVENT_BEER_POUR = 'beer:pour';
export const EVENT_SOLENOID_OPEN = 'solenoid:open';
export const EVENT_SOLENOID_CLOSE = 'solenoid:close';

export const FINGER_SCANNER_ACTIVATED = 'finger:scanner-active';
export const FINGER_SAVED = 'finger:saved';

async function getFingerprintCache(app, payload) {
    const {fingerId} = payload;

    if (cacheFingerPrint) {
        return Promise.resolve(cacheFingerPrint);
    }

    if (!fingerId) {
        return Promise.resolve();
    }

    return getFingerprint(app, {id: fingerId}).then(fingerprints => {
        cacheFingerPrint = fingerprints[0];
        return cacheFingerPrint;
    });
};

async function setSolenoidCloseTimeout(eventEmitter) {
    clearTimeout(closeSolenoidTimeout);
    closeSolenoidTimeout = setTimeout(() => eventEmitter.emit(EVENT_SOLENOID_CLOSE, {}), SOLENOID_CLOSE_TIMEOUT);
};

export const arduinoListener = app => {
    const {arduino, eventEmitter} = app.locals;

    eventEmitter.on(EVENT_FINGER_FOUND, async payload => {
        const {fingerId} = payload;

        cacheFingerPrint = null;
        cacheBeerTaps = {};

        const fingerPrint = await getFingerprintCache(app, {fingerId});

        if (fingerPrint) {
            arduino.sendData({
                action: 'solenoid:open',
                payload: {
                    fingerId: fingerPrint.id
                }
            });

            eventEmitter.emit(`socket:${EVENT_FINGER_FOUND}`, fingerPrint);
            // slackBot.fingerFound(fingerPrint);
            setSolenoidCloseTimeout(eventEmitter);
        }
    });

    eventEmitter.on(EVENT_BEER_POUR, async payload => {
        const {kegPosId: beerTapPosition, pulses, fingerId} = payload;
        const beerPoured = volumeCounter(pulses);

        if (beerPoured < 20) {
            return;
        }

        await getFingerprintCache(app, {fingerId});
        setSolenoidCloseTimeout(eventEmitter);
        cacheBeerTaps[beerTapPosition] = beerPoured;
        eventEmitter.emit(`socket:${EVENT_BEER_POUR}`, {
            beerTapPosition,
            beerPoured
        });
    });

    eventEmitter.on(EVENT_SOLENOID_OPEN, () => {
        cacheBeerTaps = {};
        setSolenoidCloseTimeout(eventEmitter);
    });

    eventEmitter.on(EVENT_SOLENOID_CLOSE, async payload => {
        const {fingerId} = payload;
        const user = await getFingerprintCache(app, {fingerId});
        let beerTaps = await getBeerTaps(app, {filter: {
            position: Object.keys(cacheBeerTaps),
            active: 1
        }});

        clearTimeout(closeSolenoidTimeout);

        if (user && Object.keys(cacheBeerTaps).length) {
            beerTaps = beerTaps.map(beerTap => {
                return {
                    ...beerTap,
                    volumePoured: cacheBeerTaps[beerTap.position]
                };
            });

            await Promise.all(
                beerTaps.map(({beerKeg, volumePoured}) => addUserBeer(app, {
                    id: user.userId,
                    beerKegId: beerKeg.id,
                    volume: volumePoured
                }))
            );
        }

        cacheFingerPrint = null;
        cacheBeerTaps = {};
        eventEmitter.emit(`socket:${EVENT_SOLENOID_CLOSE}`, {user, beerTaps});
    });

    eventEmitter.on(FINGER_SCANNER_ACTIVATED, async payload => {
        await updateFingerprintStatus(app, {
            id: payload.id,
            status: 'scan'
        });

        eventEmitter.emit(`socket:${FINGER_SCANNER_ACTIVATED}`, payload);
    });

    eventEmitter.on(FINGER_SAVED, async payload => {
        await updateFingerprintStatus(app, {
            id: payload.id,
            status: 'active'
        });

        eventEmitter.emit(`socket:${FINGER_SAVED}`, payload);
    });
};
