const defaultState = {
    fingerPrint: null,
    beerTaps: {}
};

const socketReducer = function (state = defaultState, {type, payload}) {
    switch (type) {
        case 'socket:finger:found':
            return Object.assign({}, state, {fingerPrint: payload.fingerPrint});
        case 'socket:beer:pour':
            const beerTaps = Object.assign({}, state.beerTaps, {
                [payload.beerTapPosition]: payload.beerPoured
            });

            return Object.assign({}, state, {beerTaps});

        case 'socket:solenoid:close':
            return defaultState;
    }

    return state;
};

export default socketReducer;
