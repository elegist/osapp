import React, {useRef, useState, useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import gif from '../assets/bestesgif.gif';
import globalStyles from '../styles/GlobalStyleSheet';
import TaskManager from '../container/TaskManager';
import ReadingTask from '../container/osa_tasks/ReadingTask';
import QuizTask from '../container/osa_tasks/QuizTask';
import InteractiveTask from '../container/osa_tasks/InteractiveTask';
import SummaryTask from '../container/osa_tasks/SummaryTask';
import ReadingScreen from './osa_tasks_screens/ReadingScreen';
import QuizScreen from './osa_tasks_screens/QuizScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * OsaScreen - main screen for the self assessment. This screen handles the presentation of all tasks
 */
export default function OsaScreen({navigation, route}) {
  const TASK_MANAGER = TaskManager.getInstance();
  const [progress, setProgress] = useState(0);
  const [task, setTask] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false); // State to control button visibility

  // iterating through tasks logic
  useEffect(() => {
    setTask(TASK_MANAGER.getTask(progress));
  }, [progress]);
  const nextTask = () => {
    setProgress(progress + 1);
  };
  const previousTask = () => {
    progress > 0 ? setProgress(progress - 1) : 0;
  };
  // rendering tasks logic
  const renderTask = () => {
    if (!task) return null;
    if (task instanceof ReadingTask) {
      return <ReadingScreen {...task} onTextEnd={displayNextButton} />;
    } else if (task instanceof QuizTask) {
      return <QuizScreen {...task} />;
    } else if (task instanceof InteractiveTask) {
      // TODO: InteractiveScreen ???
      return <InteractiveTask {...task} />;
    } else {
      return null;
    }
  };
  const displayNextButton = () => {
    setShowNextButton(true); // Show buttons when all text has been clicked through
  };

  // navigate to summary screen (replace instead of navigate to change back button behaviour)
  useEffect(() => {
    if (task instanceof SummaryTask) {
      navigation.replace('summaryScreen');
    }
  }, [task]);

  // resetting task manager when leaving this screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      TASK_MANAGER.resetTaskManager();
    });
    return unsubscribe;
  }, [navigation]);

  const handlePressHome = () => {
    navigation.navigate('home');
  };

  return (
    <ImageBackground
      source={require('../assets/Background.png')}
      style={globalStyles.mainBackground}>
      <View style={globalStyles.topBar}>
        <TouchableOpacity onPress={handlePressHome}>
          <Icon name="home" size={36} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.osaScreenWrapper}>{task && renderTask()}</View>

      <View style={styles.buttonWrapper}>
        {progress > 0 && (
          <TouchableOpacity
            style={[globalStyles.bigButton]}
            onPress={previousTask}>
            <Text style={[globalStyles.bigButtonText]}>Zurück</Text>
          </TouchableOpacity>
        )}
        {showNextButton && (
          <TouchableOpacity style={[globalStyles.bigButton]} onPress={nextTask}>
            <Text style={[globalStyles.bigButtonText]}>Weiter</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  osaScreenWrapper: {
    minHeight: '75%',
    width: '90%',
    alignSelf: 'center',
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
    margin: 10,
    padding: 20,
  },
  buttonWrapper: {
    alignSelf: 'center',
    maxHeight: '10%',
    marginVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
});
