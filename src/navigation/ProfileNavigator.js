import React from 'react';
import EditProfileScreen from '../screens/EditProfileScreen';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../constants/color';
import platformCheck from '../helpers/platformCheck'

const Stack = createStackNavigator();

const ProfileNavigator = ({route}) => {
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
        options={() => ({title: 'Edit Profile'})}
      />
    </Stack.Navigator>
  );  
};


export default ProfileNavigator;
