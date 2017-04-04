// import net from 'net';
import mqtt from 'mqtt';
import config from '../../config';

const arduinoConnect = function (app) {
    const {arduino: {port, host, username, password}} = config;
    const {eventEmitter} = app.locals;
    console.log(host, port, username, password);
    const arduino = mqtt.connect(host, {username, password});
    // let buffer = '';

    arduino.on('connect', function () {
        arduino.subscribe('#');
        // arduino.publish('#', 'Hello mqtt');
    });

    arduino.on('message', function (topic, message) {
        // message is Buffer
        try {
            const {event, payload} = JSON.parse(message.toString());
            console.log('{{ --- Event found +| ', event, payload);
            eventEmitter.emit(event, payload);
        } catch (error) {
            console.log(error);
        }
    });

    // arduino
    //     .on('data', buff => {
    //         buffer += buff.toString();
    //         console.log('<< --- Received buffer +| ', buff.toString());

    //         const matchedData = buffer.match(/##({.*})##/g);

    //         if (matchedData && matchedData.length) {
    //             matchedData.map(m => m.match(/##({.*})##/)[1]).forEach(mData => {
    //                 try {
    //                     const {event, data} = JSON.parse(mData);
    //                     console.log('{{ --- Event found +| ', event, data);
    //                     eventEmitter.emit(event, data);
    //                 } catch (error) {
    //                     console.log('!! --- Broken buffer +| ', mData);
    //                 }
    //             });
    //             buffer = '';
    //         }
    //     })
    //     .on('connect', () => {
    //         console.log(`Connected to Arduino. Host: ${host}:${port}`);
    //     })
    //     .on('error', error => {
    //         console.log(`Error connecting to Arduino. Host: ${host}:${port}`, error);
    //     });

    arduino.sendData = function (data) {
        data = JSON.stringify(data);
        console.log('>> --- Sending to arduino +| ', data);
        // arduino.write(data + '\n');
    };

    return arduino;
};


export default arduinoConnect;
