export const SET_EDM_PREFERRED = 'SET_EDM_PREFERRED';

export const SET_TEMPLATE_MESSAGE = 'SET_TEMPLATE_MESSAGE';

class WhitePaneAction {
    setEdmPreferred = (edmPreferred) => (dispatch) =>
        dispatch({
            type: SET_EDM_PREFERRED,
            edmPreferred,
        });

    setTemplateMessage = (templateMessage) => (dispatch) =>
        dispatch({
            type: SET_TEMPLATE_MESSAGE,
            templateMessage,
        });
}
export default new WhitePaneAction();
