import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  Pressable,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Card from '../components/Card';
import DropDownPicker from 'react-native-dropdown-picker';
import {statusList} from '../data/status-options';
import CustomModal from '../components/CustomModal';
import {useDispatch, useSelector} from 'react-redux';
import {setMe} from '../store/actions/auth';
import {updateEmployee} from '../store/actions/employees';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeScreen = () => {
  const me = useSelector(state => state.auth.me);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setMe());
    wait(500).then(() => setRefreshing(false));
  }, []);

  const Checkstatus = () => {
    if (status) {
      return (
        <Text style={[styles.textBoldLine, styles.textLine]}>{status}</Text>
      );
    } else if (me.status && !status) {
      return (
        <Text style={[styles.textBoldLine, styles.textLine]}>{me.status}</Text>
      );
    } else {
      return null;
    }
  };

  const updateEmployeeHandler = () => {
    try {
      dispatch(
        updateEmployee(
          Number(me.id),
          me.name,
          me.occupation,
          me.occupationDescription,
          status[0],
          me.address,
          me.isManagement,
          Number(me.workspace.id),
        ),
      );
      Alert.alert('Updated Successfully', '', [{text: 'Okay'}]);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    me && (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Card style={styles.container}>
          <View style={styles.container}>
            <View>
              <View style={styles.line}>
                <Text style={styles.textLine}>
                  Welcome <Text style={styles.textBoldLine}>{me.name}</Text>
                </Text>
              </View>
              <View style={styles.line}>
                <Text style={styles.textLine}>
                  {me.workspace
                    ? 'You are assigned to the'
                    : 'You are not assigned to any workspace yet'}
                </Text>
                <View style={styles.line}>
                  <View style={styles.workspaceChoosingContainer}>
                    <Text style={[styles.textBoldLine, styles.textLine]}>
                      {me?.workspace?.name || undefined}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.line}>
                <Text style={styles.textLine}>
                  {(me.status && !status) || status
                    ? 'Youre status right now is'
                    : 'You havent updated youre status yet'}
                </Text>
                <View style={styles.line}>{Checkstatus()}</View>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <View style={styles.statusChanger}>
                <Button
                  title="Change your status"
                  onPress={() => setModalVisible(true)}
                />
              </View>
              <View style={styles.workspaceChanger}>
                <Button title="UPDATE" onPress={updateEmployeeHandler} />
              </View>
            </View>
          </View>
          <View style={styles.centeredView}>
            <CustomModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.topModal}>
                    <View style={styles.modalHeader}>
                      <Text style={[styles.textLine, styles.textBoldLine]}>
                        Choose your new Status
                      </Text>
                    </View>
                    <View>
                      <DropDownPicker
                        zIndex={1000}
                        items={statusList}
                        containerStyle={{height: 40, width: 300}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                          justifyContent: 'flex-start',
                          width: '100%',
                        }}
                        dropDownStyle={{
                          backgroundColor: '#fafafa',
                          height: 600,
                        }}
                        onChangeItem={item => setStatus([item.value])}
                      />
                    </View>
                  </View>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Update</Text>
                  </Pressable>
                </View>
              </View>
            </CustomModal>
          </View>
        </Card>
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 57,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalHeader: {
    marginBottom: 40,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '80%',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80%',
    width: '90%',
  },
  line: {
    marginVertical: 10,
  },
  textLine: {
    fontSize: 20,
    textAlign: 'center',
  },
  textBoldLine: {
    fontWeight: 'bold',
  },
  btnContainer: {
    marginTop: 20,
    width: '100%',
  },
  statusChanger: {
    marginVertical: '8%',
  },
});

export default HomeScreen;
