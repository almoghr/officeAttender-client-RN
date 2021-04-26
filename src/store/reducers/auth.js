import {SET_TOKEN, SET_ME} from '../constants/auth'


const initialState = {
    token: '',
    me: {}
}

export default (state=initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case SET_TOKEN:
            return {...state, token: payload}
        case SET_ME:
            return {...state, me: payload}
        default:
            return state
    }
}