import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainStackNavigator from './MainStackNavigator';
import ProfileNavigator from './ProfileNavigator';
import platformCheck from '../helpers/platformCheck'
import Colors from '../constants/color';

const Tab = createBottomTabNavigator();

const TabNavigator = ({route}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({_, color, size}) => {
          let iconName;
          if (route.name === 'HomeTab') {
            iconName = platformCheck('android', 'home', 'home-outline');
          } else if (route.name === 'Profile') {
            iconName = platformCheck('android', 'person', 'person-outline');
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.secondary,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={MainStackNavigator}
        options={{
          title: 'HomePage',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={() => ({title: 'ME'})}
        initialParams={{profile: route.params.profile, workspaces: route.params.workspaces}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
