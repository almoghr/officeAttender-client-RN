import {gqlClient} from '../../graphql/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SET_TOKEN, SET_ME} from '../constants/auth';
import {ME} from '../../graphql/queries';
import {LOGIN, REGISTER, AUTHENTICATE_TOKEN} from '../../graphql/mutation';

const client = gqlClient();

export const setToken = token => async dispatch => {
  try {
    AsyncStorage.setItem('token', token).then(token =>
      dispatch({type: SET_TOKEN, payload: token}),
    );
  } catch (e) {
    console.log(e);
  }
};

export const setMe = () => async dispatch => {
  try {
    const result = await client.query({query: ME});
    dispatch({type: SET_ME, payload: result.data.me.employee});
    return result.data.me.employee;
  } catch (e) {
    console.log(e);
  }
};

export const updateMe = me => async dispatch => {
  try {
    dispatch({type: SET_ME, payload: me});
  } catch (e) {
    console.log(e);
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
    console.log(e);
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
    await setToken(result.data.createEmployee.token);
    await setMe(result.data.createEmployee.employee);
    return result.data.createEmployee.token;
  } catch (e) {
    console.log(e.message);
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
    console.log(e);
  }
};
