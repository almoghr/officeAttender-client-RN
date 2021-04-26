import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from "../constants/color";
import platformCheck from '../helpers/platformCheck'


const CustomHeaderButton = props => {
  return (
    <HeaderButton
    {...props}
    IconComponent={Ionicons}
    iconSize={23}
    color={platformCheck("android", "white", Colors.primary)}
    />
  );
};


export default CustomHeaderButton;
