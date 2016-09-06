import React from 'react';
import ReactDOMServer from 'react-dom/server';

const renderComponent = (req, res, next) => {
    const {Component, props, Children} = res.locals.renderComponent;

    const element = React.createElement(Component, props, Children);
    const html = ReactDOMServer.renderToString(element);

    res.locals.html = html;
    next();
};

export default renderComponent;
