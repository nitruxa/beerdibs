import fs from 'fs';
import timeValues from 'cache-headers/dist/timeValues';

function setExpiresTime(date, maxAge) {
    date.setTime(date.getTime() + (maxAge * 1000));
    return date;
}

export default function additionalCacheSettings(app) {
    const versionFile = app.locals.versionFile;
    const logger = app.locals.logger;
    const format = 'YYYY-MM-DD HH:mm:ss';
    const maxAge = app.locals.expiresTimeLength ||
        (app.locals.devbox ? 10 : timeValues.ONE_MONTH);
    const later = setExpiresTime(new Date(), maxAge);

    const expires = {maxAge, date: later};
    const lastModified = {format, date: new Date()};

    try {
        const stats = fs.statSync(versionFile);
        lastModified.date = new Date(stats.mtime);
        expires.date = setExpiresTime(new Date(stats.mtime), maxAge);
    } catch (e) {
        logger.error(`Failed to load: ${versionFile}`);
        logger.error(`Using default headers!! Fix this!!`);
    }

    return {expires, lastModified};
};
