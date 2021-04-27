import React from 'react';
import EditProfileScreen from '../screens/EditProfileScreen';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../constants/color';
import CustomHeaderButton from '../components/CustomHeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import platformCheck from '../helpers/platformCheck'
import { useDispatch } from 'react-redux'
const Stack = createStackNavigator();

const ProfileNavigator = ({route}) => {
  const dispatch = useDispatch()
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
        name="EditProfile"
        component={EditProfileScreen}
        initialParams={{me: route.params.me.employee, workspaces: route.params.workspaces}}
        options={() => ({
          title: 'Edit Profile',
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Delete"
                iconName={platformCheck('android', 'md-trash', 'ios-trash')}
                onPress={() => {
                  // dispatch(deleteUser(route.params.me.employee.id))
                  // navigation.pop();
                }}
              />
            </HeaderButtons>
          ),

        })}
      />
    </Stack.Navigator>
  );  
};


export default ProfileNavigator;
