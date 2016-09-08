import net from 'net';
import config from '../../config';

const arduinoConnect = function (app) {
    const port = 23;
    const {eventEmitter} = app.locals;
    const arduino = net.connect({port, host: config.arduinoHost});
    let buffer = '';

    arduino
        .on('data', buff => {
            buffer += buff.toString();

            const matchedData = buffer.match(/##({.*})##/g);

            if (matchedData && matchedData.length) {
                matchedData.map(m => m.match(/##({.*})##/)[1]).forEach(mData => {
                    const {event, data} = JSON.parse(mData);
                    console.log('{eventEmitter}', event, data);
                    eventEmitter.emit(event, data);
                });
                buffer = '';
            }
        })
        .on('connect', () => {
            console.log(`Connected to Arduino. Host: ${config.arduinoHost}:${port}`);
        })
        .on('error', error => {
            console.log(`Error connecting to Arduino. Host: ${config.arduinoHost}:${port}`, error);
        });

    return arduino;
};


export default arduinoConnect;
