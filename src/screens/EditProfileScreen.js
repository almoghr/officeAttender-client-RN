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
import {useDispatch, useSelector} from 'react-redux';
import {updateEmployee} from '../store/actions/employees';
import {setLoading} from '../store/actions/loading';
import {setToasterMessage} from '../store/actions/toaster';

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
  const profile = useSelector(state => state.auth.profile);
  const [error, setError] = useState();
  const [workspace, setWorkspace] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: profile.name,
      occupation: profile.occupation,
      occupationDescription: profile.occupationDescription,
      status: profile.status,
      address: profile.address,
      isManagement: false,
      workspaceId: Number(profile.workspace.id),
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
  const formChecker = (formState) => {
    if (
      profile.name === formState.inputValues.name &&
      profile.occupation === formState.inputValues.occupation &&
      profile.occupationDescription === formState.inputValues.occupationDescription && 
      profile.address === formState.inputValues.address &&
      Number(profile.workspace.id) === (Number(formState.inputValues.workspaceId) || Number(workspace.item) || Number(profile.workspace.id))
    ) {
      return false
    } else return true
  };
  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input', 'Please check the errors in the form', [
        {text: 'Okay'},
      ]);
      return;
    }
    setError(null);
    dispatch(setLoading(true));
    const formIntegrityCheck = formChecker(formState)

    if (!formIntegrityCheck) {
      dispatch(setToasterMessage('nothing changed'))
      navigation.goBack();
    }
    try {
      dispatch(
        updateEmployee(
          Number(profile.id),
          formState.inputValues.name,
          formState.inputValues.occupation,
          formState.inputValues.occupationDescription,
          formState.inputValues.status,
          formState.inputValues.address,
          formState.inputValues.isManagement,
          formState.inputValues.workspaceId ||
            workspace.item ||
            profile.workspace.id,
        ),
      );
      dispatch(setLoading(false));
      navigation.goBack();
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
      dispatch(setToasterMessage('an error occured while trying to edit profile'));
    }
  }, []);

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
              errorText="Please enter a valid name!"
              keyboardType="default"
              autoCorrect
              autoCapitalize="sentences"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={profile ? profile.name : ''}
              initiallyValid={!!profile}
              required
            />
            <Input
              id="occupation"
              label="Occupation"
              errorText="Please enter a valid occupation!"
              keyboardType="default"
              onInputChange={inputChangeHandler}
              returnKeyType="next"
              initialValue={profile ? profile.occupation : ''}
              initiallyValid={!!profile}
              required
            />
            <Input
              id="occupationDescription"
              label="Occupation Description"
              errorText="Please enter a valid description!"
              onInputChange={inputChangeHandler}
              keyboardType="default"
              returnKeyType="next"
              initialValue={profile ? profile.occupationDescription : ''}
              initiallyValid={!!profile}
              required
            />
            <Input
              id="address"
              label="Address"
              errorText="Please enter a valid address!"
              onInputChange={inputChangeHandler}
              keyboardType="default"
              autoCorrect
              autoCapitalize="sentences"
              multiline
              numberOfLines={2}
              initialValue={profile ? profile.address : ''}
              initiallyValid={!!profile}
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
            <Button title={'Edit'} onPress={submitHandler} />
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
