import {TOGGLE_LOADING} from '../constants/loading';

const initialState = {
  loading: false,
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case TOGGLE_LOADING:
      return {loading: payload};
    default:
      return state;
  }
};
