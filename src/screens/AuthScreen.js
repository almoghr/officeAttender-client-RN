import React, {useState} from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import {useDispatch, useSelector} from 'react-redux'
import {setAllWorkspaces} from '../store/actions/workspaces'

const AuthScreen = props => {
  
  const dispatch = useDispatch();
  dispatch(setAllWorkspaces())
  const workspaces = useSelector(state => state.workspaces.workspaces)
  const [isLogin, setIsLogin] = useState(true);
  
  const isLoginSubmitted = false;
  const isRegisterSubmitted = false;

  const onAuthenticated = token => {
    props.onAuthenticated(token);
  };
  


  if (isLogin && !isLoginSubmitted) {
    return <Login setIsLogin={setIsLogin} onAuthenticated={onAuthenticated} />;
  } else if (!isLogin && !isRegisterSubmitted) {
    return (
      <Register
        setIsLogin={setIsLogin}
        onAuthenticated={onAuthenticated}
        workspaces={workspaces}
      />
    );
  }
};
export default AuthScreen;
