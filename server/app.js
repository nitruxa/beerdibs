import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cache from 'cache-headers';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import nunjucks from 'nunjucks';

import additionalHeaders from './helpers/additionalHeaders';
import configure from './config/configure';
import router from './routes';
import cacheSettings from './helpers/cacheSettings';
import webpackConfig from '../webpack.config';
import {notFound, errorHandler} from './middleware/error';
import renderComponent from './middleware/renderComponent';

const app = configure(express(), {
    versionFile: path.resolve(__dirname, '../public/version.json')
});

const cacheOptions = {
    cacheSettings: {},
    paths: {
        '/**': cacheSettings[app.get('env')] || cacheSettings.defaults
    }
};

/**
 * nginx terminates SSL in production. In other environments we use self-signed
 * certs, this setting makes node happy in those cases. On production, express
 * never sees an SSL request.
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 * Setup webpack dev server if we're on a devbox. Hook up to the compiler instance so we know
 * when compilation was successful.
 */
if (app.locals.devbox) {
    const webpackInstance = webpack(webpackConfig);
    const webpackMiddlewareInstance = webpackMiddleware(webpackInstance, webpackConfig.devServer);
    app.use(webpackMiddlewareInstance);

    webpackInstance.plugin('done', () => app.locals.logger.info('Webpack recompilation successful'));
}

app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'nunjucks');
app.set('etag', false);
app.set('x-powered-by', false);

app.use(app.locals.logger.requestLog());

nunjucks.configure(app.get('views'), {
    autoescape: true,
    express: app
});

app.use(express.static('public', {
    etag: false
}));

/**
 * TODO: Get last deploy file
 * Set default cache headers based on the last deploy; ignore this on devbox
 * environment; defers to the cache-headers#setAdditionalHeaders middleware.
 */
if (!app.locals.devbox) {
    const headers = additionalHeaders(app);
    app.use(cache.setAdditionalHeaders(headers));
    app.locals.logger.info('Setting additional cache headers', headers);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cache.middleware(cacheOptions));

app.use(router);

// The 404 handler is the last route (nothing has handled it).
// app.use(notFound, renderComponent, (req, res) => {
//     const html = res.locals.html;

//     res.status(404).render('base', {
//         title: '404 Page not found',
//         content: html
//     });
// });

app.get('*', (req, res) => {
    res.status(404).render('base');
});

// Uncaught errors are handled below -- don't put any routes, controllers, etc below here!
// app.use(app.locals.logger.errorLog, errorHandler, (req, res) => {
//     res.status(500).render('500', {
//         title: 'Whoops'
//     });
// });

export default app;
