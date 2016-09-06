import PdpLayout from '../../client/components/PdpLayout';

const preparePdpComponent = (req, res, next) => {
    const {itemId} = req.params;

    res.locals.relayOptions = {
        Component: PdpLayout,
        queryConfig: {
            name: 'ItemRoute',
            params: {itemId}
        }
    };

    next();
};

export default preparePdpComponent;
