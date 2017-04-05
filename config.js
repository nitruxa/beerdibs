import path from 'path';

const devboxHost = "//beerdibs.com";
const port = Number(process.env.NODE_PORT) || 3001;

export default {
    port,
    socketPort: 4080,
    serviceHost: process.env.NODE_SERVICE_HOST || devboxHost,
    cookieDomain: '.beerdibs.com',
    devbox: process.env.NODE_ENV !== 'production',
    db: path.resolve(__dirname, process.env.DATABASE_PATH),
    arduino: {
        host: process.env.MQTT_HOST,
        username: process.env.MQTT_USER,
        password: process.env.MQTT_PASS
    }
};
