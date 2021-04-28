import React from 'react';
import {StyleSheet, View} from 'react-native';

const Card = ({children, ...props}) => {
  return <View style={{...styles.card, ...props.style}}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    //shadows for ios
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    // shadows for android
    elevation: 5,
    padding: 20,
    borderRadius: 20,
  },
});
export default Card;
