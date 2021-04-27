import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import WorkSpaceScreen from '../screens/WorkSpaceScreen';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../constants/color';
import CustomHeaderButton from '../components/CustomHeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import platformCheck from '../helpers/platformCheck'

const Stack = createStackNavigator();

const MainStackNavigator = () => {
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
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          title: 'Welcome!',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={platformCheck('android', 'md-menu', 'ios-menu')}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="workspace"
        component={WorkSpaceScreen}
        options={({navigation}) => ({
          title: 'Welcome!',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={platformCheck('android', 'md-menu', 'ios-menu')}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
