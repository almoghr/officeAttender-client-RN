import {SET_MESSAGE} from '../constants/toaster';

export const setToasterMessage = (message) => async dispatch => {
    dispatch({type: SET_MESSAGE, payload: message})
}
