import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/color'
const EmployeeExtraDetails = props => {
  const {
    name,
    status,
    occupation,
    occupationDescription,
    address,
    workspace,
  } = props;
  return (
    <ScrollView>
    <View style={styles.container}>
      <Card style={styles.innerContainer}>
        <View>
          <Card style={styles.rowContainer}>
            <View>
              <Text style={[styles.smSize, styles.bold]}>{name}</Text>
            </View>
            <View>
              <Text style={[styles.smSize, styles.bold]}>{occupation}</Text>
            </View>
          </Card>
          <Card style={styles.columnContainer}>
            <View>
              <Text style={[styles.lgSize, styles.bold, styles.centered]}>
                {occupationDescription}
              </Text>
            </View>
          </Card>
          <Card style={styles.columnContainer}>
            <View>
              <Text style={[styles.smSize, styles.bold]}>{address}</Text>
            </View>
          </Card>
          <Card style={styles.columnContainer}>
            <View>
              <Text style={[styles.center, styles.lgSize, styles.bold]}>{status ? `status:  ${status}` : `no status has been chosen for ${name}`}</Text>
            </View>
          </Card>
          <Card style={styles.columnContainer}>
            <View style={styles.columnContainer}>
              <Text style={[styles.lgSize, styles.bold]}>
                related to the workspace:
              </Text>
            </View>
            <View>
              <Text style={[styles.xlSize, styles.bold]}>{workspace}</Text>
            </View>
          </Card>
        </View>
      </Card>
    </View>
    </ScrollView>
  );
};

export default EmployeeExtraDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    height: '100%',
    marginVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: '3%',
    flexGrow: 1,
  },
  innerContainer:{
    width: '100%',
    marginHorizontal:10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  columnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,

  },
  center:{textAlign:'center'},
  bold: {fontWeight: 'bold'},
  smSize: {fontSize: 15},
  lgSize: {fontSize: 20},
  xlSize: {fontSize: 32, color: Colors.primary},
  centered:{textAlign: 'center', letterSpacing: 0.5}
});

