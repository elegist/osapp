import React from 'react';
import {Text, View, TouchableOpacity, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const CustomDrawer = props => {
  return (
    <DrawerContentScrollView>
      <View>
        <DrawerItemList {...props} />
        <DrawerItem label={'Homepage der THM'} onPress={() => Linking.openURL("https://www.thm.de")} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
