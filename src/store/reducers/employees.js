import {SET_EMPLOYEES} from '../constants/employees';

const initialState = {
  employees: []
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_EMPLOYEES:
      return {...state, employees: payload};
    default:
      return state;
  }
};
