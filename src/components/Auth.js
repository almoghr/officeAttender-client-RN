import React, {useState, useEffect} from 'react';
import LoadingSpinner from './LoadingSpinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from '../screens/AuthScreen';
import {useDispatch, useSelector} from 'react-redux';
import {verifyToken} from '../store/actions/auth';
import {setLoading} from '../store/actions/loading';
import Toast from 'react-native-simple-toast';
import {setToasterMessage} from '../store/actions/toaster'



const storeData = async (token, dispatch) => {
  try {
    console.log(token)
    await AsyncStorage.setItem('token', token);
  } catch (e) {
    dispatch(setToasterMessage('an error occured while trying to set data to the Async Storage'));
  }
};

const getTokenFromAsyncStorage = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (e) {
    dispatch(setToasterMessage('an error occured while fetching data from the Async Storage'));
  }
};

const checkTokenValidity = async (token, dispatch) => {
  if (token) {
    try {
      const response = await dispatch(verifyToken(token));
      return (
        response.data.verifyToken.payload.exp -
          response.data.verifyToken.payload.origIat >
        0
      );
    } catch (e) {
      dispatch(setToasterMessage('an error occured while trying to check the token validity'));
    }
  }
};

const isAuthenticated = async dispatch => {
  return getTokenFromAsyncStorage(dispatch).then(token =>
    checkTokenValidity(token, dispatch),
  );
};

const Auth = props => {
  const message = useSelector(state => state.toaster.message);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading.loading);
  const [isUserAuthenticated, setAuthenticated] = useState(false);

  const onComponentLoad = async (setLoading, setAuthenticated) => {
    const authenticated = await isAuthenticated(dispatch);
    console.log('going to register')
    console.log(authenticated)
    setAuthenticated(!!authenticated);
    dispatch(setLoading(false));
  };

  const handleAuthenticated = async (setLoading, setAuthenticated, token) => {
    storeData(token, dispatch);
    console.log(token)
    props.setToken(token);
    setAuthenticated(true);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    onComponentLoad(setLoading, setAuthenticated);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if(message){
    Toast.showWithGravity(message, Toast.LONG, Toast.TOP)
  }

  if (!isUserAuthenticated) {
    return (
      <>
        <AuthScreen
          onAuthenticated={token =>
            handleAuthenticated(setLoading, setAuthenticated, token)
          }
        />
      </>
    );
  }

  return (
    <>{props.children}</>
  );
};

export default Auth;
