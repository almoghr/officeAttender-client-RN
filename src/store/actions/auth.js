import {gqlClient} from '../../graphql/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SET_TOKEN, SET_PROFILE} from '../constants/auth';
import {PROFILE} from '../../graphql/queries';
import {LOGIN, REGISTER, AUTHENTICATE_TOKEN} from '../../graphql/mutation';
import {setToasterMessage} from './toaster'
const client = gqlClient();

export const setToken = token => async dispatch => {
  try {
    AsyncStorage.setItem('token', token).then(token =>
      dispatch({type: SET_TOKEN, payload: token}),
    );
  } catch (e) {
    dispatch(setToasterMessage(e.message));
  }
};

export const setProfile = () => async dispatch => {
  try {
    const result = await client.query({query: PROFILE});
    dispatch({type: SET_PROFILE, payload: result.data.profile.employee});
    return result.data.profile.employee;
  } catch (e) {
    dispatch(setToasterMessage(e.message));
  }
};

export const updateProfile = profile => async dispatch => {
  try {
    dispatch({type: SET_PROFILE, payload: profile});
  } catch (e) {
    dispatch(setToasterMessage(e.message));
  }
};

export const signIn = (username, password) => async () => {
  try {
    const result = await client.mutate({
      mutation: LOGIN,
      variables: {username, password},
    });
    setToken(result.data.tokenAuth.token);
    return result.data.tokenAuth.token;
  } catch (e) {
    dispatch(setToasterMessage(e.message));
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
) => async () => {
  try {
    const result = await client.mutate({
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
    setToken(result.data.createEmployee.token);
    setProfile(result.data.createEmployee.employee);
    return result.data.createEmployee.token;
  } catch (e) {
    dispatch(setToasterMessage(e.message));
  }
};

export const verifyToken = token => async () => {
  try {
    const result = await client.mutate({
      mutation: AUTHENTICATE_TOKEN,
      variables: {token},
    });
    return result;
  } catch (e) {
    dispatch(setToasterMessage(e.message));
  }
};
