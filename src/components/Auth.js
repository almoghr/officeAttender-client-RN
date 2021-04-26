import React, {useState, useEffect} from 'react';
import LoadingSpinner from './LoadingSpinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from '../screens/AuthScreen';
import {useDispatch} from 'react-redux';
import {verifyToken} from '../store/actions/auth';

_storeData = async token => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.log(e);
  }
};

const getTokenFromAsyncStorage = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (e) {
    console.log(e);
  }
};

const checkTokenValidity = async (token, dispatch) => {
  if (token) {
    try {
      const response = await dispatch(verifyToken(token));
      const timeLeft =
        response.data.verifyToken.payload.exp -
          response.data.verifyToken.payload.origIat >
        0;
      return timeLeft;
    } catch (e) {
      console.log(e);
    }
  }
};

const isAuthenticated = async (dispatch) => {
  const token = await getTokenFromAsyncStorage();
  const isValid = await checkTokenValidity(token, dispatch);
  return token && isValid;
};

const Auth = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isUserAuthenticated, setAuthenticated] = useState(false);

  const onComponentLoad = async (setLoading, setAuthenticated) => {
    setLoading(true);
    const authenticated = await isAuthenticated(dispatch);
    setAuthenticated(!!authenticated);
    setLoading(false);
  };

  const handleAuthenticated = async (setLoading, setAuthenticated, token) => {
    _storeData(token);
    props.setToken(token);
    setAuthenticated(true);
    setLoading(false);
  };

  useEffect(() => {
    onComponentLoad(setLoading, setAuthenticated);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isUserAuthenticated) {
    return (
      <AuthScreen
        onAuthenticated={token =>
          handleAuthenticated(setLoading, setAuthenticated, token)
        }
      />
    );
  }

  return <>{props.children}</>;
};

export default Auth;
