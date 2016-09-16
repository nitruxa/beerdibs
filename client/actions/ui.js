export const RESET_UI_ACTION = 'ui:reset-action';

export const resetUiAction = () => {
    return dispatch => {
        dispatch({type: RESET_UI_ACTION});
    };
};
