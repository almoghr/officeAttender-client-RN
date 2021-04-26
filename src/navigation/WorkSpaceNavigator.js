import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WorkSpaceScreen from '../screens/WorkSpaceScreen';
import Colors from '../constants/color';
import CustomHeaderButton from '../components/CustomHeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import SingleUserScreen from '../screens/SingleUserScreen';
import platformCheck from '../helpers/platformCheck';
import {useDispatch, useSelector} from 'react-redux';
import {setAllEmployees} from '../store/actions/employees';

const Stack = createStackNavigator();

const WorkSpaceNavigator = ({route}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAllEmployees());
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: platformCheck('android', Colors.primary, 'white'),
        },
        headerTintColor: platformCheck('android', 'white', Colors.primary),
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name={route.name}
        component={WorkSpaceScreen}
        initialParams={{
          workspace: route.params.workspace,
        }}
        options={({navigation}) => ({
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="menu"
                  iconName={platformCheck('android', 'md-menu', 'ios-menu')}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            );
          },
        })}
      />
      <Stack.Screen name="SingleUser" component={SingleUserScreen} />
    </Stack.Navigator>
  );
};

export default WorkSpaceNavigator;
