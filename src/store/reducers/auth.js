import {SET_TOKEN, SET_PROFILE} from '../constants/auth'


const initialState = {
    token: '',
    profile: {}
}

export default (state=initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case SET_TOKEN:
            return {...state, token: payload}
        case SET_PROFILE:
            return {...state, profile: payload}
        default:
            return state
    }
}