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
import DropDownPicker from 'react-native-dropdown-picker';
import Input from '../components/Input';
import LoadingSpinner from '../components/LoadingSpinner';
import {useDispatch, useSelector} from 'react-redux';
import {updateEmployee} from '../store/actions/employees';

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

const EditProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const workspaces = useSelector(state => state.workspaces.workspaces);
  const user = useSelector(state => state.auth.me);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [workspace, setWorkspace] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: user.name,
      occupation: user.occupation,
      occupationDescription: user.occupationDescription,
      status: user.status,
      address: user.address,
      isManagement: false,
      workspaceId: Number(user.workspace.id),
    },
    inputValidities: {
      name: true,
      occupation: true,
      occupationDescription: true,
      status: true,
      address: true,
      isManagement: true,
      workspaceId: true,
    },
    formIsValid: true,
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
      dispatch(
        updateEmployee(
          Number(user.id),
          formState.inputValues.name,
          formState.inputValues.occupation,
          formState.inputValues.occupationDescription,
          formState.inputValues.status,
          formState.inputValues.address,
          formState.inputValues.isManagement,
          formState.inputValues.workspaceId ||
            workspace.item ||
            user.workspace.id,
        ),
      );
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
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
    return <LoadingSpinner />;
  }
  const mappedWorkspaces = workspaces.map(workspace => {
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
      <KeyboardAvoidingView
        behavior="height"
        style={{flex: 1}}
        keyboardVerticalOffset={1}>
        <ScrollView>
          <View style={styles.form}>
            <Input
              id="name"
              label="Name"
              errorText="please enter a valid name!"
              keyboardType="default"
              autoCorrect
              autoCapitalize="sentences"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={user ? user.name : ''}
              initiallyValid={!!user}
              required
            />
            <Input
              id="occupation"
              label="Occupation"
              errorText="please enter a valid occupation!"
              keyboardType="default"
              onInputChange={inputChangeHandler}
              returnKeyType="next"
              initialValue={user ? user.occupation : ''}
              initiallyValid={!!user}
              required
            />
            <Input
              id="occupationDescription"
              label="Occupation Description"
              errorText="please enter a valid description!"
              onInputChange={inputChangeHandler}
              keyboardType="default"
              returnKeyType="next"
              initialValue={user ? user.occupationDescription : ''}
              initiallyValid={!!user}
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
              initialValue={user ? user.address : ''}
              initiallyValid={!!user}
              required
            />
          </View>
          <View style={styles.lastStepForm}>
            <Text style={styles.label}>Workspace</Text>
            <View style={styles.dropdownPicker}>
              <DropDownPicker
                zIndex={1000}
                items={mappedWorkspaces}
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
                  inputChangeHandler('workspaceId', +item.value, !!item.value);
                  setWorkspace({item: item.value});
                }}
              />
            </View>
            <View></View>
            <Button
              title={user ? 'Edit' : 'Register'}
              onPress={submitHandler}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 20,
    flex: 1,
    height: '100%',
  },
  formControl: {
    width: '100%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginHorizontal: 20,
    marginVertical: 8,
    fontSize: 22,
    fontWeight: 'bold',
  },
  dropdownPicker: {
    marginHorizontal: 20,
    marginBottom: '37%',
  },
  lastStepForm: {flexDirection: 'column', justifyContent: 'center'},
});

export default EditProfileScreen;
