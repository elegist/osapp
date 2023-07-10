import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import globalStyles, { getResponsiveSizing } from '../styles/GlobalStyleSheet';
import FastImage from 'react-native-fast-image';
import TopBar from '../components/TopBar';

/**
 * HomeScreen - the landing page or main screen of the application
 */
export default function HomeScreen({navigation}) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    navigation.navigate('osaScreen');
    setIsPressed(false);
  };

  return (
    <ImageBackground
      source={require('../assets/Background.png')}
      style={globalStyles.mainBackground}>
      <TopBar navigation={navigation} />
      <View style={styles.mainContainer}>
        <FastImage
          style={{width: getResponsiveSizing(250), height: getResponsiveSizing(125)}}
          source={require('../assets/OSAPP.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <TouchableOpacity
          style={[
            globalStyles.bigButton,
            isPressed && globalStyles.bigButtonPressed,
          ]}
          onPress={handlePress}>
          <Text
            style={[
              globalStyles.textBigButton,
              isPressed && globalStyles.textParagraph,
            ]}>
            Online Self Assessment beginnen!
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    width: '100%',
    height: '100%',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'black',
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

