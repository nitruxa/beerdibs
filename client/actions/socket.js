let reconnectInterval;

export const FINGER_FOUND = 'socket:finger:found';
export const BEER_POUR = 'socket:beer:pour';
export const SOLENOID_CLOSE = 'socket:solenoid:close';

export const FINGER_SCANNER_ACTIVATED = 'socket:finger:scanner-active';
export const FINGER_EVENT = 'socket:finger:event';
export const FINGER_SAVED = 'socket:finger:saved';
export const FINGER_ERROR = 'socket:finger:error';

export const connectSocket = function () {
    return dispatch => {
        const ws = new WebSocket(`ws://${window.location.hostname}:4080`);

        ws.onopen = () => {
            clearTimeout(reconnectInterval);
            console.log('Socket is connected');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            dispatch({
                type: `socket:${data.event}`,
                payload: data.data
            });
        };

        ws.onclose = event => {
            clearTimeout(reconnectInterval);
            console.log('Socket is closed. Reconnect will be attempted in 5 second.', event.reason);
            reconnectInterval = setInterval(() => connectSocket()(dispatch), 5000);
        };

        ws.onerror = err => {
            console.error('Socket encountered error: ', err.message, 'Closing socket');
            ws.close();
        };
    };
};
