import registerRootComponent from "expo/build/launch/registerRootComponent";
import React from "react";
import {View} from "react-native";
const index: React.FC = () => (
  <View style = {{ backgroundColor: 'blue', height: '100%', width: '100%'}}/>
);
registerRootComponent(index);
