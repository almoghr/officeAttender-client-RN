import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import WorkSpaceNavigator from '../navigation/WorkSpaceNavigator';
import TabNavigator from './TabNavigator';
import {setProfile} from '../store/actions/auth';
import {setAllWorkspaces} from '../store/actions/workspaces';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../store/actions/loading';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading.loading)
  const profile = useSelector(state => state.auth.profile);
  const workspaces = useSelector(state => state.workspaces.workspaces);

  useEffect(() => {
    dispatch(setLoading(true));
    console.log('3rd')
    dispatch(setProfile());
    dispatch(setAllWorkspaces());
    if (profile && workspaces) {
      dispatch(setLoading(false));
    }
  }, [loading, profile, workspaces]);


  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={() => ({title: 'Homepage'})}
        initialParams={{profile, workspaces}}
      />
      {profile &&
        workspaces.map(workspace => {
          if (workspace.id === profile?.workspace?.id || profile.isManagement) {
            return (
              <Drawer.Screen
                key={workspace.id}
                name={workspace.name}
                component={WorkSpaceNavigator}
                initialParams={{workspace: workspace}}
              />
            );
          }
        })}
      {profile && profile.isManagement && (
        <Drawer.Screen
          name="All-Workspaces"
          component={WorkSpaceNavigator}
          initialParams={{
            workspace: workspaces,
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
