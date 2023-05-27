import React, {useRef, useState, useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import gif from '../assets/bestesgif.gif';
import globalStyles from '../styles/GlobalStyleSheet';
import TaskManager from '../container/TaskManager';


export default function OsaScreen({ navigation, route }) {
  const TASK_MANAGER = TaskManager.getInstance();
  const [progress, setProgress] = useState(0);
  const [topic, setTopic] = useState(0);
  const [task, setTask] = useState(null);

  useEffect(() => {
    setTask(TASK_MANAGER.getTask(TASK_MANAGER._topics[topic], progress));
  }, [progress, topic]);

  const nextTask = () => {
    setProgress(progress + 1);
  };

  const previousTask = () => {
    setProgress(progress - 1);
  };

  return (
    <View style={globalStyles.flexContainer}>
      <View style={styles.imageWrapper}>
        {task && (
          <>
            <Text>Topic: {task._topic}</Text>
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
            <Text>Title: {task._title}</Text>
            <Text>Message: {task.string}</Text>
          </>
        )}
      </View>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={[globalStyles.bigButton]} onPress={previousTask}>
          <Text style={[globalStyles.bigButtonText]}>Zurück</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyles.bigButton]} onPress={nextTask}>
          <Text style={[globalStyles.bigButtonText]}>Weiter</Text>
        </TouchableOpacity>
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
  buttonWrapper: {
    marginVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
});
