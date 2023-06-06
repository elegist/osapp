import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import globalStyles from '../styles/GlobalStyleSheet';
import TaskManager from '../container/TaskManager';
import ReadingTask from '../container/osa_tasks/ReadingTask';
import QuizTask from '../container/osa_tasks/QuizTask';
import InteractiveTask from '../container/osa_tasks/InteractiveTask';
import SummaryTask from '../container/osa_tasks/SummaryTask';
import ReadingScreen from './osa_tasks_screens/ReadingScreen';
import QuizScreen from './osa_tasks_screens/QuizScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressBar from 'react-native-progress/Bar';
import InteractiveScreen from './osa_tasks_screens/InteractiveScreen';

export default function OsaScreen({ navigation, route }) {
  const TASK_MANAGER = TaskManager.getInstance();
  const [progress, setProgress] = useState(0);
  const [task, setTask] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [displayTaskContainer, setDisplayTaskContainer] = useState(false);
  const numberOfTasks = TASK_MANAGER.numberOfTasks;

  useEffect(() => {
    const currentTask = TASK_MANAGER.getTask(progress);
    setTask(currentTask);
    setShowNextButton(false);

    let isTaskContainerDisplayed = false;

    if (currentTask instanceof ReadingTask) {
      isTaskContainerDisplayed = false;
    } else if (currentTask instanceof QuizTask) {
      isTaskContainerDisplayed = true;
    } else if (currentTask instanceof InteractiveTask) {
      isTaskContainerDisplayed = false; // or true, depending on your logic
    }

    setDisplayTaskContainer(isTaskContainerDisplayed);
  }, [progress]);

  const nextTask = () => {
    setProgress((prevProgress) => prevProgress + 1);
  };

  const previousTask = () => {
    setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - 1 : 0));
  };

  const renderTask = () => {
    if (!task) return null;
    if (task instanceof ReadingTask) {
      return (
        <ReadingScreen key={task.id} {...task} onTextEnd={displayNextButton} />
      );
    } else if (task instanceof QuizTask) {
      return <QuizScreen {...task} onQuizFinished={displayNextButton} />;
    } else if (task instanceof InteractiveTask) {
      return <InteractiveScreen {...task} onTaskFinished={displayNextButton} />;
    } else {
      return null;
    }
  };

  const displayNextButton = () => {
    setShowNextButton(true);
  };

  useEffect(() => {
    if (task instanceof SummaryTask) {
      navigation.replace('summaryScreen');
    }
  }, [task]);

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
      <View style={{ ...globalStyles.topBar, justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={handlePressHome}>
          <Icon name="home" size={36} color="black" />
        </TouchableOpacity>
        <ProgressBar
          style={styles.progressBar}
          progress={progress / numberOfTasks}
          color={'#8CBA45'}
          height={16}
          width={null}
        />
        <Icon style={{ opacity: 0 }} name="home" size={36} color="black" />
      </View>
      <View
        style={displayTaskContainer ? styles.osaScreenWrapper : styles.osaNoWrapper}>
        {task && renderTask()}
      </View>

      <View style={styles.buttonWrapper}>
        {progress > 0 && (
          <TouchableOpacity
            style={globalStyles.smallButton}
            onPress={previousTask}>
            <Text style={globalStyles.textSmallButton}>Zurück</Text>
          </TouchableOpacity>
        )}
        {showNextButton && (
          <TouchableOpacity
            style={[globalStyles.smallButton]}
            onPress={nextTask}>
            <Text style={globalStyles.textSmallButton}>
              {progress === numberOfTasks - 1 ? 'Abschließen' : 'Weiter'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  osaScreenWrapper: {
    minHeight: '75%',
    width: '80%',
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
  osaNoWrapper: {
    minHeight: '75%',
    width: '100%',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
  progressBar: {
    height: 16,
    alignSelf: 'center',
    flex: 0.5
  },
});
