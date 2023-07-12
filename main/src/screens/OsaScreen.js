import React, {Component} from 'react';
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
import ReadingScreen from './osa_tasks_screens/ReadingScreen';
import QuizScreen from './osa_tasks_screens/QuizScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressBar from 'react-native-progress/Bar';
import InteractiveScreen from './osa_tasks_screens/InteractiveScreen';
import ExamplesTask from '../container/osa_tasks/ExamplesTask';
import ExamplesScreen from './osa_tasks_screens/ExamplesScreen';
import SummaryTask from '../container/osa_tasks/SummaryTask';


class OsaScreen extends Component {
  constructor(props) {
    super(props);
    this.TASK_MANAGER = TaskManager.getInstance();
    this.state = {
      progress: 0,
      task: null,
      previousTask: null,
    };
  }

  componentDidMount() {
    this.updateTask();
    this.props.navigation.addListener('focus', this.updateTask);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.route.params?.resetOsa !== this.props.route.params?.resetOsa
    ) {
      if (this.props.route.params?.resetOsa) {
        this.resetComponent();
        this.TASK_MANAGER = TaskManager.getInstance();
      }
      this.updateTask();
    }
    if (prevState.progress !== this.state.progress) {
      this.updateTask();
    }
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus');
  }

  updateTask = () => {
    const {progress} = this.state;
    const currentTask = this.TASK_MANAGER.getTask(progress);
    this.setState(
      prevState => ({
        previousTask: prevState.task,
        task: currentTask,
      }),
      () => this.checkSummaryTask(),
    );
    currentTask.startTimeMeasurement();
  };

  nextTask = () => {
    this.setState(prevState => ({
      progress: prevState.progress + 1,
    }));
  };

  lastTask = () => {
    this.setState(prevState => ({
      progress: prevState.progress > 0 ? prevState.progress - 1 : 0,
    }));
  };

  renderTask = () => {
    const {task} = this.state;
    if (!task) return null;
    if (task instanceof ReadingTask) {
      return (
        <ReadingScreen key={task.id} task={task} nextTask={this.nextTask} />
      );
    } else if (task instanceof QuizTask) {
      return <QuizScreen key={task.id} task={task} nextTask={this.nextTask} />;
    } else if (task instanceof InteractiveTask) {
      return (
        <InteractiveScreen key={task.id} task={task} nextTask={this.nextTask} />
      );
    } else if (task instanceof ExamplesTask) {
      return (
        <ExamplesScreen key={task.id} nextTask={this.nextTask} source="tasks" />
      );
    } else {
      return null;
    }
  };

  checkSummaryTask = () => {
    const {task} = this.state;
    if (task instanceof SummaryTask) {
      const timestamp = Date.now();
      this.props.navigation.navigate('summaryScreen', {
        key: `SummaryScreen_${timestamp}`,
      });
    }
  };

  resetComponent = () => {
    this.setState({
      progress: 0,
      task: null,
      previousTask: null,
    }),
      () => {
        this.updateTask();
      };
  };

  render() {
    const {progress, task} = this.state;
    const numberOfTasks = this.TASK_MANAGER.numberOfTasks;

    return (
      <ImageBackground
        source={require('../assets/Background.png')}
        style={globalStyles.mainBackground}>
        <View style={{...globalStyles.topBar, justifyContent: 'space-between'}}>
          <TouchableOpacity disabled={progress === 0} onPress={this.lastTask}>
            <Icon
              name="step-backward"
              size={36}
              color="black"
              style={{opacity: 0}}
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
          <TouchableOpacity onPress={this.nextTask}>
            <Icon
              style={{opacity: 0}}
              name="step-forward"
              size={36}
              color="red"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.taskContainer}>{task && this.renderTask()}</View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
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

export default OsaScreen;
