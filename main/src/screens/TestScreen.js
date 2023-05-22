import React, {useRef} from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, View} from 'react-native';
import gif from '../assets/bestesgif.gif';
import globalStyles from '../styles/GlobalStyleSheet';
import TaskManager from '../container/TaskManager';

export default function TestScreen({navigation, route}) {
  const TASK_MANAGER = TaskManager.getInstance() //initializing TaskManager
  let progress = 0
  let task = TASK_MANAGER.retreiveTask(TASK_MANAGER._topics[1], progress)

  return (
    <View style={globalStyles.flexContainer}>
      <View style={styles.imageWrapper}>
        <FastImage
          source={gif}
          style={{
            width: '80%',
            height: undefined,
            aspectRatio: 1.5,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 8,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text>Titel: {task._title}</Text>
        <Text>Topic: {task._topic}</Text>
        <Text>Message: {task.string}</Text>
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
});
