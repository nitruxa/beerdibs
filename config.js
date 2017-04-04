import path from 'path';

const devboxHost = "//beerdibs.com";
const port = Number(process.env.NODE_PORT) || 3001;
const mimicArduino = process.env.MIMIC_ARDUINO;

export default {
    // app.get('env') returns process.env.NODE_ENV or 'development'
    port,
    socketPort: 4080,
    serviceHost: process.env.NODE_SERVICE_HOST || devboxHost,
    cookieDomain: '.beerdibs.com',
    devbox: true,
    db: path.resolve(__dirname, './server/db/test.db'),
    mimicArduino,
    arduino: {
        host: mimicArduino ? '127.0.0.1' : 'mqtt://192.168.1.100',
        // port: mimicArduino ? 6969 : 80,
        username: 'beer',
        password: 'c0ff33'
    },
    slackBotEnabled: false,
    slackBot: {
        channel: 'teamlt',
        token: 'xoxp-2175730572-50384117639-66647698881-f68cbf1735',
        username: 'BeerDibs',
        'icon_emoji': ':beer:',
        'link_names': 1
    }
    // wwwDomainName: process.env.NODE_WWW_DOMAIN || devboxHost,
    // dotComHost: process.env.NODE_BUYER_HOST || devboxHost,
    // cdnDomain: process.env.NODE_CDN_DOMAIN || devboxHost,
    // qualarooSrc: '//s3.amazonaws.com/ki.js/58771/d5z.js',
    // devbox: (process.env.NODE_BUYER_HOST || devboxHost) === devboxHost
};
