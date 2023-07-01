import React from 'react';
import {Text, View, ImageBackground, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import globalStyles, {getResponsiveSizing} from '../styles/GlobalStyleSheet';
import FastImage from 'react-native-fast-image';

const CustomDrawer = props => {
  return (
    <DrawerContentScrollView contentContainerStyle={{flex: 1, paddingTop: 20}}>
      <ImageBackground
        source={require('../assets/Background.png')}
        style={globalStyles.mainBackground}
        resizeMode="cover">
        <FastImage
          style={{width: 200, height: 100, alignSelf: 'center'}}
          source={require('../assets/OSAPP.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={{...globalStyles.horizontalLine, paddingVertical: 10}} />
        <View style={{paddingVertical: 20}}>
          <DrawerItemList {...props} />
          <View style={{...globalStyles.horizontalLine, paddingTop: 10}} />
          <DrawerItem
            label={({focused, color}) => (
              <Text
                style={{
                  ...globalStyles.textParagraph,
                  fontSize: getResponsiveSizing(16),
                  color: focused ? '#111' : color,
                }}>
                THM Webseite
              </Text>
            )}
            icon={({focused, color, size}) => (
              <Icon
                name={focused ? 'external-link-square' : 'external-link'}
                color={color}
                size={size}
              />
            )}
            onPress={() => Linking.openURL('https://www.thm.de')}
          />
        </View>
      </ImageBackground>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
