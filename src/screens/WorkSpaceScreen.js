import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import Employee from '../components/Employee';

const WorkSpaceScreen = ({navigation, route}) => {
  const employees = useSelector(state => state.employees.employees);
  const workspace = route.params.workspace;
  const WhichWorkSpace = () => {
    if (route.name === 'All-Workspaces') {
      if (employees) {
        const mappedWorkers = employees.map(employee => {
          return (
            <Employee
              key={employee.id}
              name={employee.name}
              occupation={employee.occupation}
              status={employee.status}
              onPress={() =>
                navigation.navigate('SingleUser', {
                  employee: employee,
                  workspace: employee.workspace.name,
                })
              }
            />
          );
        });
        return mappedWorkers;
      }
    } else {
      if (employees) {
        filteredEmployees = employees.filter(employee => employee.workspace);
        filteredEmployeesRelatedToWorkspace = filteredEmployees.filter(
          employee =>
            employee.workspace.id === workspace.id || employee.isManagement,
        );
        const mappedWorkers = filteredEmployeesRelatedToWorkspace.map(
          employee => {
            return (
              <Employee
                key={employee.id}
                name={employee.name}
                occupation={employee.occupation}
                status={employee.status}
                onPress={() =>
                  navigation.navigate('SingleUser', {
                    employee: employee,
                    workspace: route.params.workspace.name,
                  })
                }
              />
            );
          },
        );
        return mappedWorkers;
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {route.name !== 'All-Workspaces' ? (
              <Text>
                Welcome to <Text style={styles.bold}>{workspace.name}</Text>
              </Text>
            ) : (
              <Text style={styles.bold}>Management Only</Text>
            )}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            {route.name !== 'All-Workspaces'
              ? workspace.description
              : 'View all of the workers in our company'}
          </Text>
        </View>
        {route.name !== 'All-Workspaces' && (
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{workspace.address}</Text>
          </View>
        )}
      </View>
      <ScrollView>
        <View style={styles.listContainer}>{<WhichWorkSpace />}</View>
      </ScrollView>
    </View>
  );
};

export default WorkSpaceScreen;

const styles = StyleSheet.create({
  container: {flex: 1, margin: 10, overflow: 'hidden'},
  details: {alignItems: 'center', justifyContent: 'center', margin: 10},
  nameContainer: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {fontSize: 25, textAlign: 'center'},
  bold: {fontWeight: 'bold'},
  descriptionContainer: {alignItems: 'center', justifyContent: 'center'},
  description: {fontSize: 22, textAlign: 'center'},
  addressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  address: {
    fontSize: 18,
    textAlign: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  listContainer: {width: '100%', justifyContent: 'center'},
});
