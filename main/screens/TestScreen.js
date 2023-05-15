import React, { useRef } from 'react';
import FastImage from 'react-native-fast-image';
import { StyleSheet, Text, View, Animated } from 'react-native'
import gif from '../assets/bestesgif.gif'
import globalStyles from '../styles/GlobalStyleSheet';

import TaskManager from '../container/task_manager/TaskManager';

export default function TestScreen({navigation, route}) {
  const TASKS = new TaskManager({testInteger: 200}) //initializing TaskManager with a prop.

  return (
    <View style={globalStyles.flexContainer}>
        <View style={styles.imageWrapper}>
        <FastImage
        source={gif}
        style={{ width: '80%', height: undefined, aspectRatio: 1.5, borderWidth: 1, borderColor: 'black', borderRadius: 8 }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text>{ TASKS.testInteger /* calling the prop on TaskManager */}</Text>
      <Text>{ TASKS.retreiveTaskList("Programmieren") /* calling some function on TaskManager */}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
      imageWrapper: {
        borderRadius: 8,
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