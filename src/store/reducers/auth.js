import {SET_TOKEN, SET_PROFILE} from '../constants/auth'


const initialState = {
    token: '',
    profile: {}
}

export default (state=initialState, action) => {
    const { type, payload } = action;

    switch(type){
        case SET_TOKEN:
            console.log(payload)
            return {...state, token: payload}
        case SET_PROFILE:
            console.log(payload)
            return {...state, profile: payload}
        default:
            return state
    }
}