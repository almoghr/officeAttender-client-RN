import React, {useState, useEffect, useCallback, useReducer} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Text,
} from 'react-native';
import Input from '../components/Input';
import Colors from '../constants/color';
import {useDispatch} from 'react-redux';
import {setLoading} from '../store/actions/loading'
import {signIn} from '../store/actions/auth'
import {setToasterMessage} from '../store/actions/toaster'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const Login = ({setIsLoginComponent, onAuthenticated}) => {
  const dispatch = useDispatch()
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: '',
      password: '',
    },
    inputValidities: {
      username: false,
      password: false,
    },
    formIsValid: false,
  });

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input', 'Please check the errors in the form', [
        {text: 'Okay'},
      ]);
      return;
    }
    setError(null);
    dispatch(setLoading(true))
    try {
      const token = await dispatch(signIn(formState.inputValues.username, formState.inputValues.password))
      onAuthenticated(token);
      
    } catch (err) {
      dispatch(setToasterMessage('an error occured while trying to login'));
    }
  }, [formState]);
  


  const inputChangeHandler = useCallback(
    (formInputType, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: formInputType,
      });
    },
    [dispatchFormState],
  );

  useEffect(() => {
    if (error) {
      dispatch(setToasterMessage('an error occured while trying to login'));
    }
  }, [error]);


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior="height"
        style={{flex: 1}}
        keyboardVerticalOffset={1}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>LOGIN</Text>
        </View>
        <View style={styles.form}>
          <Input
            id="username"
            label="Username"
            minLength={5}
            errorText="Please enter a valid username!"
            keyboardType="default"
            autoCorrect
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            required
          />
          <Input
            id="password"
            label="Password"
            minLength={6}
            secureTextEntry
            errorText="Please enter a valid password!"
            keyboardType="default"
            autoCorrect
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            required
          />
          <View style={styles.buttonContainer}>
            <Button title="SUBMIT" onPress={submitHandler} />
            <Button
              title="Register instead"
              onPress={() => setIsLoginComponent(false)}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#ccc',
  },
  header: {
    fontSize: 48,
    color: Colors.secondary,
    textAlign: 'center',
  },
  form: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 20,
    height: 90,
    justifyContent: 'space-between',
  },
});

export default Login;
