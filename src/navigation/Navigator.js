import React, {useState, useEffect} from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import {createDrawerNavigator} from '@react-navigation/drawer';
import WorkSpaceNavigator from '../navigation/WorkSpaceNavigator';
import TabNavigator from './TabNavigator';
import {setMe} from '../store/actions/auth';
import {setAllWorkspaces} from '../store/actions/workspaces'
import {useSelector, useDispatch} from 'react-redux';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const me = useSelector(state => state.auth.me);
  const workspaces = useSelector(state => state.workspaces.workspaces);

  useEffect(() => {
    setLoading(true);
    dispatch(setMe());
    dispatch(setAllWorkspaces())
    if(me && workspaces){
      setLoading(false);
    }
  }, [loading, me, workspaces]);


  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={() => ({title: 'Homepage'})}
        initialParams={{me, workspaces}}
      />
      {me && workspaces.map(workspace => {
          if (
            (workspace.id === me?.workspace?.id) ||
            me.isManagement
          ) {
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
      {me && me.isManagement && (
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
