import Relay from 'react-relay';
import isomorphicRelay from 'isomorphic-relay';

const prepareRelayComponent = (req, res, next) => {
    const {relayNetworkLayer} = req.app.locals;
    const {relayOptions: {Component, queryConfig}} = res.locals;

    const rootContainerProps = {
        Container: Component,
        queryConfig: Object.assign({
            name: 'DefaultRoute',
            queries: {
                viewer: (Container, params) => Relay.QL`
                    query {
                        viewer {
                            ${Container.getFragment('viewer', params)}
                        }
                    }
                `
            },
            params: {}
        }, queryConfig)
    };

    isomorphicRelay.prepareData(rootContainerProps, relayNetworkLayer)
        .then(({data, props}) => {
            res.locals.data = data;
            res.locals.renderComponent = {
                Component: isomorphicRelay.Renderer,
                props,
                Children: Component
            };

            next();
        })
        .catch(next);
};

export default prepareRelayComponent;
