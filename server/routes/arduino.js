import {Router} from 'express';
import net from 'net';
import config from '../../config';

const router = new Router();
const HOST = '127.0.0.1';
const PORT = 6969;

if (config.mimicArduino) {
    const server = net.createServer();
    server.listen(PORT, HOST);

    let netSocket = null;

    server.on('connection', function (sock) {
        netSocket = sock;
    });


    const renderMiddleware = function (req, res) {
        res.status(200).render('arduino');
    };

    router.get('/', (req, res, next) => {
        next();
    }, renderMiddleware);

    router.post('/action', (req, res) => {
        if (netSocket) {
            netSocket.write(`##${JSON.stringify(req.body)}##`);
        }

        res.status(200).send('OK');
    });
}

export default router;
