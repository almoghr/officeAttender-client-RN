import React, {useEffect} from 'react';
import EmployeeExtraDetails from '../components/EmployeeExtraDetails';

const SingleUserScreen = ({route, navigation}) => {
  const employee = route.params.employee;

  useEffect(() => {
    navigation.setOptions({title: employee.name});
  }, [route.params.employee]);
  return (
    <EmployeeExtraDetails
      name={employee.name}
      occupation={employee.occupation}
      occupationDescription={employee.occupationDescription}
      status={employee.status}
      workspace={employee.workspace.name}
      address={employee.address}
    />
  );
};

export default SingleUserScreen;