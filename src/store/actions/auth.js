import {gqlClient} from '../../graphql/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SET_TOKEN, SET_PROFILE} from '../constants/auth';
import {PROFILE} from '../../graphql/queries';
import {LOGIN, REGISTER, AUTHENTICATE_TOKEN} from '../../graphql/mutation';
import {setToasterMessage} from './toaster'


export const setToken = token => async dispatch => {
  try {
    AsyncStorage.setItem('token', token).then(token =>
      dispatch({type: SET_TOKEN, payload: token}),
    );
  } catch (e) {
    dispatch(setToasterMessage('an error occured while trying to set the token'));
  }
};

export const setProfile = () => async dispatch => {
  try {
    const client = gqlClient();
    console.log('this client is from the setProfile', client) 
    const result = await client.query({query: PROFILE});
    
    dispatch({type: SET_PROFILE, payload: result.data.profile.employee});
    return result.data.profile.employee;
  } catch (e) {
    console.log(e.message)
    dispatch(setToasterMessage('an error occured while trying to set profile'));
  }
};

export const getProfile = (profile) => async dispatch => {
  dispatch({type: SET_PROFILE, payload: profile})
}
export const updateProfile = profile => async dispatch => {
  try {
    dispatch({type: SET_PROFILE, payload: profile});
  } catch (e) {
    dispatch(setToasterMessage('an error occured while trying to update profile'));
  }
};

export const signIn = (username, password) => async dispatch => {
  try {
    const client = gqlClient();
    console.log('this client is from the signIn', client) 

    const result = await client.mutate({
      mutation: LOGIN,
      variables: {username, password},
    });
    dispatch({type: SET_TOKEN, payload: result.data.tokenAuth.token})
    
    return result.data.tokenAuth.token;
  } catch (e) {
    dispatch(setToasterMessage('an error occured while trying to login'));
  }
};

export const register = (
  username,
  password,
  email,
  name,
  occupation,
  occupationDescription,
  address,
  isManagement = false,
  workspaceId,
) => async dispatch => {
  console.log('trying to get the data', username, password, email, name, occupation, occupationDescription, address, isManagement, workspaceId)
  try {
    const result = await gqlClient().mutate({
      mutation: REGISTER,
      variables: {
        username,
        password,
        email,
        name,
        occupation,
        occupationDescription,
        address,
        isManagement,
        workspaceId,
      },
    });
    await gqlClient().mutate({mutation: LOGIN, variables:{
      username, password
    }})
    dispatch({type: SET_TOKEN, payload: result.data.createEmployee.token})
    getProfile(result.data.createEmployee.employee)
    // dispatch({type: SET_PROFILE, payload: result.data.createEmployee.employee})
    return result.data.createEmployee.token;
  } catch (e) {
    dispatch(setToasterMessage('an error occured while trying to register'));
  }
}

export const verifyToken = token => async dispatch => {
  try {
    const result = await gqlClient().mutate({
      mutation: AUTHENTICATE_TOKEN,
      variables: {token},
    });
    return result;
  } catch (e) {
    dispatch(setToasterMessage('an error occured while trying to verify the token'));
  }
};
