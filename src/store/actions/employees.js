import {gqlClient} from '../../graphql/client';
import {UPDATE_EMPLOYEE, DELETE_AN_EMPLOYEE} from '../../graphql/mutation';
import {GET_ALL_EMPLOYEES} from '../../graphql/queries'
import {SET_EMPLOYEES, DELETE_EMPLOYEE} from '../constants/employees';
import {updateProfile} from './auth';
import {setToasterMessage} from './toaster'

const client = gqlClient();

export const updateEmployee = (
  employeeId,
  name,
  occupation,
  occupationDescription,
  status = null,
  address,
  isManagement = false,
  workspaceId,
) => async () => {
  try {
    const result = await client.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: {
        employeeId,
        name,
        occupation,
        occupationDescription,
        status,
        address,
        isManagement,
        workspaceId,
      },
    });
    updateProfile(result.data.updateEmployee.employee);
  } catch (e) {
    dispatch(setToasterMessage(e.message));
  }
};

export const setAllEmployees = () => async dispatch => {
    try{
        const result = await client.query({query:GET_ALL_EMPLOYEES})
        dispatch({type: SET_EMPLOYEES, payload: result.data.employees})
    } catch(e){
      dispatch(setToasterMessage(e.message));
    }
}

export const deleteEmployee = (employeeId) => async dispatch => {
  try{
    await client.mutate({mutation:DELETE_AN_EMPLOYEE, variables : { employeeId }})
    await dispatch({type: DELETE_EMPLOYEE, payload: {employeeId}})
    setAllEmployees()
  } catch(e){
    dispatch(setToasterMessage(e.message));
  }
}
