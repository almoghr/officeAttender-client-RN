import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import Card from './Card';

const Employee = ({ name, occupation, status, onPress }) => {
  let ButtonComponent =
    Platform.OS === 'ios' && Platform.version >= 21
      ? TouchableOpacity
      : TouchableWithoutFeedback;

  return (
    <ButtonComponent onPress={onPress} style={styles.touchable}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.rowContainer}>
            <View style={styles.nameWrapper}>
              <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.occupationWrapper}>
              <Text style={styles.occupation}>{occupation}</Text>
            </View>
          </View>
          <View style={styles.rowTwoContainer}>
            <View style={styles.statusContainer}>
              <Text style={styles.status}>{status ? `Status:  ${status}` : `No status has been chosen for ${name}`}</Text>
            </View>
          </View>
        </Card>
      </View>
    </ButtonComponent>
  );
};

export default Employee;

const styles = StyleSheet.create({
  touchable: {overflow: 'hidden', width: '100%'},
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 2,
    marginVertical: 10,
    paddingVertical: 3,
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rowTwoContainer: {alignItems: 'center', justifyContent: 'center'},
  name: {fontWeight: 'bold', fontSize: 15},
  status: {fontWeight: 'bold', fontSize: 15, textAlign: 'center'},
  occupation: {fontWeight: 'bold', fontSize: 15},
});
