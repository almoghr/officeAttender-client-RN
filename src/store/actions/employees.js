import {gqlClient} from '../../graphql/client';
import {UPDATE_EMPLOYEE} from '../../graphql/mutation';
import {GET_ALL_EMPLOYEES} from '../../graphql/queries'
import {SET_EMPLOYEES} from '../constants/employees';
import {updateMe} from './auth';

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
    updateMe(result.data.updateEmployee.employee);
  } catch (e) {
    console.log(e);
  }
};

export const setAllEmployees = () => async dispatch => {
    try{
        const result = await client.query({query:GET_ALL_EMPLOYEES})
        dispatch({type: SET_EMPLOYEES, payload: result.data.employees})
    } catch(e){
        console.log(e)
    }
}
