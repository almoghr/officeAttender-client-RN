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
import {useDispatch} from 'react-redux'
import {signIn} from '../store/actions/auth'
import LoadingSpinner from './LoadingSpinner'
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

const Login = props => {
  const dispatch = useDispatch()
  const {setIsLogin} = props;
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      const token = await dispatch(signIn(formState.inputValues.username, formState.inputValues.password))
      props.onAuthenticated(token);
      
    } catch (err) {
      setError(err.message);
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
      Alert.alert('An error occured', error, [{text: 'Okay'}]);
    }
  }, []);

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

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
            errorText="please enter a valid username!"
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
            errorText="please enter a valid password!"
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
              onPress={() => setIsLogin(false)}
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
