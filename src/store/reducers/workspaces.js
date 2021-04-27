import {SET_WORKSPACES} from '../constants/workspaces';

const initialState = {
  workspaces: [],
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_WORKSPACES:
      return {...state, workspaces: payload};
    default:
      return state;
  }
};
