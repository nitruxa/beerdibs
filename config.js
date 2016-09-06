import path from 'path';

const devboxHost = "//beerdibs.com";
const port = Number(process.env.NODE_PORT) || 3001;

export default {
    // app.get('env') returns process.env.NODE_ENV or 'development'
    port,
    serviceHost: process.env.NODE_SERVICE_HOST || devboxHost,
    cookieDomain: '.beerdibs.com',
    devbox: true,
    db: path.resolve(__dirname, './server/db/test.db')
    // wwwDomainName: process.env.NODE_WWW_DOMAIN || devboxHost,
    // dotComHost: process.env.NODE_BUYER_HOST || devboxHost,
    // cdnDomain: process.env.NODE_CDN_DOMAIN || devboxHost,
    // qualarooSrc: '//s3.amazonaws.com/ki.js/58771/d5z.js',
    // devbox: (process.env.NODE_BUYER_HOST || devboxHost) === devboxHost
};
