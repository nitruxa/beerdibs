import statuses from 'statuses';
import notFoundComponent from '../../client/error/404';

export function notFound(req, res, next) {

    if (req.xhr) {
        res.status(404).json({
            url: req.originalUrl,
            error: 'Not Found'
        });
    } else {
        res.locals.renderComponent = {
            Component: notFoundComponent
        };

        next();
    }
}

export function errorHandler(err, req, res, next) {

    err.status = err.status || 500;

    const errorModel = {
        url: req.url,
        statusCode: err.status,
        title: statuses[err.status]
    };

    if (req.xhr) {
        res.status(err.status).json(Object.assign(errorModel));
    } else {
        next();
    }
}
