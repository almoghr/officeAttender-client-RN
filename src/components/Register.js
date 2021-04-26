import React, {useState, useEffect, useCallback, useReducer} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Text,
} from 'react-native';
import LoadingSpinner from './LoadingSpinner';

import {useDispatch} from 'react-redux';
import Input from '../components/Input';
import Colors from '../constants/color';
import DropDownPicker from 'react-native-dropdown-picker';
import {register} from '../store/actions/auth';
import platformCheck from '../helpers/platformCheck';

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

const Register = props => {
  const dispatch = useDispatch();
  const {setIsLogin} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {  
      username: '',
      password: '',
      email: '',
      name: '',
      occupation: '',
      occupationDescription: '',
      address: '',
      isManagement: false,
      workspaceId: '',
    },
    inputValidities: {
      username: false,
      password: false,
      email: false,
      name: false,
      occupation: false,
      occupationDescription: false,
      address: false,
      isManagement: true,
      workspaceId: false,
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
      const token = await dispatch(
        register(
          formState.inputValues.username,
          formState.inputValues.password,
          formState.inputValues.email,
          formState.inputValues.name,
          formState.inputValues.occupation,
          formState.inputValues.occupationDescription,
          formState.inputValues.address,
          false,
          Number(formState.inputValues.workspaceId),
        ),
      );
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

  const workspacesFromProps = props.workspaces.map(workspace => {
    return {
      label: workspace.name,
      value: workspace.id,
      id: workspace.id,
      icon: () => {
        return;
      },
    };
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView>
        <KeyboardAvoidingView
          style={styles.screen}
          behavior={platformCheck('ios', 'padding', '')}
          keyboardVerticalOffset={30}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>REGISTER</Text>
          </View>
          <View style={styles.form}>
            <Input
              id="username"
              label="Username"
              minLength={4}
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
            <Input
              id="email"
              label="E-mail"
              errorText="please enter a valid email address!"
              keyboardType="email-address"
              autoCorrect
              autoCapitalize="sentences"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
            />
            <Input
              id="name"
              label="Name"
              errorText="please enter a valid name!"
              keyboardType="default"
              autoCorrect
              autoCapitalize="sentences"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue=""
              required
            />
            <Input
              id="occupation"
              label="Occupation"
              errorText="please enter a valid occupation!"
              keyboardType="default"
              onInputChange={inputChangeHandler}
              returnKeyType="next"
              initialValue=""
              required
            />
            <Input
              id="occupationDescription"
              label="Occupation Description"
              errorText="please enter a valid description!"
              onInputChange={inputChangeHandler}
              keyboardType="default"
              returnKeyType="next"
              initialValue=""
              required
            />
            <Input
              id="address"
              label="Address"
              errorText="please enter a valid address!"
              onInputChange={inputChangeHandler}
              keyboardType="default"
              autoCorrect
              autoCapitalize="sentences"
              multiline
              numberOfLines={2}
              initialValue=""
              required
            />
            <View style={styles.lastStepForm}>
              <Text style={styles.label}>Workspace</Text>
              <View style={styles.dropdownPicker}>
                <DropDownPicker
                  zIndex={1000}
                  items={workspacesFromProps}
                  placeholder="Select a workspace"
                  dropDownMaxHeight={150}
                  containerStyle={{height: 40, width: '100%'}}
                  style={{backgroundColor: '#fafafa'}}
                  itemStyle={{
                    justifyContent: 'flex-start',
                    width: '100%',
                  }}
                  dropDownStyle={{backgroundColor: '#fafafa'}}
                  onChangeItem={item => {
                    inputChangeHandler('workspaceId', item.value, !!item.value);
                  }}
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="SUBMIT" onPress={submitHandler} />
              <Button title="Login instead" onPress={() => setIsLogin(true)} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
  label: {
    marginVertical: 8,
    fontSize: 22,
    fontWeight: 'bold',
  },
  dropdownPicker: {
    marginBottom: '37%',
  },
  lastStepForm: {flexDirection: 'column', justifyContent: 'center'},
});

export default Register;
