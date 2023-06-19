import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
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
import ExamplesTask from '../container/osa_tasks/ExamplesTask';
import ExamplesScreen from './osa_tasks_screens/ExamplesScreen';

export default function OsaScreen({navigation, route}) {
  const TASK_MANAGER = TaskManager.getInstance();
  const [progress, setProgress] = useState(0);
  const [task, setTask] = useState(null);
  const [previousTask, setPreviousTask] = useState(null); // Added previousTask state
  const numberOfTasks = TASK_MANAGER.numberOfTasks;

  useEffect(() => {
    const currentTask = TASK_MANAGER.getTask(progress);
    setPreviousTask(task);
    setTask(currentTask);
    currentTask.startTimeMeasurement()
  }, [progress]);

  useEffect(() => {
    if (!(task instanceof SummaryTask)) {
      task?.startTimeMeasurement()
    }
    previousTask?.stopTimeMeasurement()
  }, [task, previousTask])

  const nextTask = () => {
    setProgress(prevProgress => prevProgress + 1);
  };

  const lastTask = () => {
    setProgress(prevProgress => (prevProgress > 0 ? prevProgress - 1 : 0));
  };

  const renderTask = () => {
    //console.log(task);
    if (!task) return null;
    if (task instanceof ReadingTask) {
      return <ReadingScreen key={task.id} {...task} nextTask={nextTask} />;
    } else if (task instanceof QuizTask) {
      return <QuizScreen key={task.id} {...task} nextTask={nextTask} />;
    } else if (task instanceof InteractiveTask) {
      return <InteractiveScreen key={task.id} {...task} nextTask={nextTask} />;
    } else if (task instanceof ExamplesTask) {
      return (
        <ExamplesScreen
          key={task.id}
          {...task}
          nextTask={nextTask}
          source="tasks"
        />
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (task instanceof SummaryTask) {
      navigation.replace('summaryScreen');
    }
  }, [task]);

  return (
    <ImageBackground
      source={require('../assets/Background.png')}
      style={globalStyles.mainBackground}>
      <View style={{...globalStyles.topBar, justifyContent: 'space-between'}}>
        <TouchableOpacity disabled={progress === 0} onPress={lastTask}>
          <Icon
            name="step-backward"
            size={36}
            color="black"
            style={progress === 0 ? {opacity: 0} : {opacity: 1}}
          />
        </TouchableOpacity>
        <ProgressBar
          style={styles.progressBar}
          progress={progress / numberOfTasks}
          color={'#8CBA45'}
          height={16}
          width={null}
        />
        {/* TODO: remove later, this is only for debug purposes! */}
        <TouchableOpacity onPress={nextTask}>
          <Icon
            style={{opacity: 1}}
            name="step-forward"
            size={36}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <View
        style={
          task instanceof InteractiveTask
            ? styles.interactiveTaskContainer
            : styles.taskContainer
        }>
        {task && renderTask()}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    minHeight: '75%',
    width: '100%',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 10,
  },
  interactiveTaskContainer: {
    flex: 1,
    width: '100%',
    margin: 5,
    padding: 10,
  },
  progressBar: {
    height: 16,
    alignSelf: 'center',
    flex: 0.85,
  },
});
