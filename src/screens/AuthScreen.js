import React, {useState} from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import {useDispatch, useSelector} from 'react-redux'
import {setAllWorkspaces} from '../store/actions/workspaces'

const AuthScreen = (props) => {
  
  const dispatch = useDispatch();
  dispatch(setAllWorkspaces())
  const workspaces = useSelector(state => state.workspaces.workspaces)
  const [isLoginComponent, setIsLoginComponent] = useState(true);
  const onAuthenticated = token => {
    props.onAuthenticated(token);
  };
  


  if (isLoginComponent) {
    return <Login setIsLoginComponent={setIsLoginComponent} onAuthenticated={onAuthenticated} />;
  } else if (!isLoginComponent) {
    return (
      <Register
      setIsLoginComponent={setIsLoginComponent}
        onAuthenticated={onAuthenticated}
        workspaces={workspaces}
      />
    );
  }
};
export default AuthScreen;
