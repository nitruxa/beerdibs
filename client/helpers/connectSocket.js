import moment from 'moment';

let reconnectInterval;

const connectSocket = callback => {
    const ws = new WebSocket('ws://127.0.0.1:4080');

    ws.onopen = () => {
        clearTimeout(reconnectInterval);
        console.log('Socket is connected');
    };

    ws.onmessage = event => {
        const data = JSON.parse(event.data);
        console.log('{SOCKET}', moment(new Date()).format(), data);
        callback(data);
    };

    ws.onclose = event => {
        clearTimeout(reconnectInterval);
        console.log('Socket is closed. Reconnect will be attempted in 5 second.', event.reason);
        reconnectInterval = setInterval(() => connectSocket(callback), 5000);
    };

    ws.onerror = err => {
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        ws.close();
    };
};

export default connectSocket;
