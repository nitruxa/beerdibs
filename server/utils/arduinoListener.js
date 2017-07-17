import volumeCounter from '../helpers/volumeCounter';
import {getFingerprint, updateFingerprintStatus} from '../controllers/userFingerprints';
import {getBeerTaps} from '../controllers/beerTaps';
import {addUserBeer} from '../controllers/userBeers';

// import * as slackBot from './slackBot';

const SOLENOID_CLOSE_TIMEOUT = 15000;

let cacheFingerPrint = null;
let cacheBeerPour = {};
let cacheBeerTaps = [];
let closeSolenoidTimeout;

export const EVENT_BEER_POUR = 'beer:pour';
export const EVENT_SOLENOID_OPEN = 'solenoid:open';
export const EVENT_SOLENOID_CLOSE = 'solenoid:close';

export const EVENT_FINGER_FOUND = 'finger:found';
export const FINGER_EVENT = 'finger:event';
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

async function getBeerTapsCache(app) {
    if (cacheBeerTaps.length) {
        return Promise.resolve(cacheBeerTaps);
    }

    cacheBeerTaps = await getBeerTaps(app, {filter: {
        active: 1
    }});

    return cacheBeerTaps;
};

async function setSolenoidCloseTimeout(eventEmitter) {
    clearTimeout(closeSolenoidTimeout);
    closeSolenoidTimeout = setTimeout(() => eventEmitter.emit(EVENT_SOLENOID_CLOSE, {}), SOLENOID_CLOSE_TIMEOUT);
};

async function saveBeerToUser({app, fingerId}) {
    const user = await getFingerprintCache(app, {fingerId});
    let beerTaps = await getBeerTapsCache(app);

    clearTimeout(closeSolenoidTimeout);

    if (user && Object.keys(cacheBeerPour).length) {
        beerTaps = beerTaps.map(beerTap => {
            return {
                ...beerTap,
                volumePoured: cacheBeerPour[beerTap.position]
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
    cacheBeerTaps = [];
    cacheBeerPour = {};

    return {user, beerTaps};
}

export const arduinoListener = app => {
    const {arduino, eventEmitter} = app.locals;

    eventEmitter.on(EVENT_FINGER_FOUND, async payload => {
        const {fingerId} = payload;

        if (cacheFingerPrint) {
            await saveBeerToUser({app, fingerId});
        }

        cacheFingerPrint = null;
        cacheBeerPour = {};

        const fingerPrint = await getFingerprintCache(app, {fingerId});

        // Cache beer taps
        await getBeerTapsCache(app);

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
        const beerTaps = await getBeerTapsCache(app);
        const beerTap = beerTaps.find(tap => tap.position === beerTapPosition);

        const beerPoured = volumeCounter(pulses, beerTap.ratio);

        if (beerPoured < 20) {
            return;
        }

        await getFingerprintCache(app, {fingerId});
        setSolenoidCloseTimeout(eventEmitter);
        cacheBeerPour[beerTapPosition] = beerPoured;
        eventEmitter.emit(`socket:${EVENT_BEER_POUR}`, {
            beerTapPosition,
            beerPoured
        });
    });

    eventEmitter.on(EVENT_SOLENOID_OPEN, () => {
        cacheBeerPour = {};
        setSolenoidCloseTimeout(eventEmitter);
    });

    eventEmitter.on(EVENT_SOLENOID_CLOSE, async payload => {
        const {fingerId} = payload;
        const {user, beerTaps} = await saveBeerToUser({app, fingerId});
        eventEmitter.emit(`socket:${EVENT_SOLENOID_CLOSE}`, {user, beerTaps});
    });

    eventEmitter.on(FINGER_EVENT, async ({fingerId, message}) => {
        eventEmitter.emit(`socket:${FINGER_EVENT}`, {
            id: fingerId,
            message
        });
    });

    eventEmitter.on(FINGER_SAVED, async payload => {
        await updateFingerprintStatus(app, {
            id: payload.fingerId,
            status: 'active'
        });

        eventEmitter.emit(`socket:${FINGER_SAVED}`, {
            id: payload.fingerId
        });
    });
};
