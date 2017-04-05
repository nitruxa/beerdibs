import mqtt from 'mqtt';
import config from '../../config';

const arduinoConnect = function (app) {
    const {arduino: {port, host, username, password}} = config;
    const {eventEmitter} = app.locals;
    const arduino = mqtt.connect(host, {username, password});

    arduino.on('connect', function () {
        arduino.subscribe('/beer/mcu/events');
    });

    arduino.on('message', function (topic, message) {
        try {
            const {event, payload} = JSON.parse(message.toString());
            console.log('<<< ', event, payload);
            eventEmitter.emit(event, payload);
        } catch (error) {
            console.log(error);
        }
    });

    arduino.sendData = function (data) {
        data = JSON.stringify(data);
        console.log('>>> ', data);
        arduino.publish('/beer/mcu/api', data);
    };

    return arduino;
};


export default arduinoConnect;
