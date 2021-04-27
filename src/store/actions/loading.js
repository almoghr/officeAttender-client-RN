import { TOGGLE_LOADING } from '../constants/loading'

export const setLoading = (loading) => async dispatch => {
    dispatch({type: TOGGLE_LOADING, payload: loading})
}