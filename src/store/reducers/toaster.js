import {SET_MESSAGE} from '../constants/toaster';

const initialState = {
  message: '',
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_MESSAGE:
      return {message: payload};
    default:
      return state;
  }
};
