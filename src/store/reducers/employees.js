import {SET_EMPLOYEES, DELETE_EMPLOYEE} from '../constants/employees';

const initialState = {
  employees: [],
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_EMPLOYEES:
      return {...state, employees: payload};
    case DELETE_EMPLOYEE:
      let newEmployeesArr = state.employees;
      const {employeeId} = payload;
      const employeeIndex = newEmployeesArr.findIndex(
        employee => employee.id === employeeId,
      );
      return {employees: newEmployeesArr.splice(employeeIndex, 1)};
    default:
      return state;
  }
};
