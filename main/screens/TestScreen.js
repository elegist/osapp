import React, { useRef } from 'react';
import FastImage from 'react-native-fast-image';
import { StyleSheet, Text, View, Animated } from 'react-native'
import gif from '../assets/bestesgif.gif'

export default function TestScreen({navigation, route}) {

  return (
    <View style={styles.container}>
        <View style={styles.imageWrapper}>
        <FastImage
        source={gif}
        style={{ width: '80%', height: undefined, aspectRatio: 1.5, borderWidth: 1, borderColor: 'black' }}
        resizeMode={FastImage.resizeMode.contain}
      />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
      imageWrapper: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 6,
      },
})