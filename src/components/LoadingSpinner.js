import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import Colors from '../constants/color'

const LoadingSpinner = () => {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
